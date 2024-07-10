import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect,useRef } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity,Keyboard,TouchableWithoutFeedback } from 'react-native';
import CheckBox from 'expo-checkbox'; 
import DeleteIcon from './components/delete';
import SelectAll from './components/selectAll';

export default function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([
    { text: "Yemek yap", completed: false },
    { text: "Kitap oku", completed: true },
    { text: "Spor yap", completed: false },
  ]);

  const todoRefs = useRef(todos.map(() => React.createRef()));
  const [pressIndex,setPressIndex]=useState(0);
  
  useEffect(() => {
    todoRefs.current = todos.map((_, i) => todoRefs.current[i] || React.createRef());
    if (todoRefs.current[pressIndex] && todoRefs.current[pressIndex].current) {
      todoRefs.current[pressIndex].current.focus();
    }
  }, [todos, pressIndex]);
  
  const onToggle=(index)=>{
    let newTodos=[...todos];
    newTodos[index].completed=!newTodos[index].completed;
    setTodos(newTodos);
  }
  
  const onAddTask=()=>{
    if(task=="") return;
    setTodos([...todos, {text:task, completed:false}]);
    setTask("");
  } 

  const onDeleteTask=(index)=>{
    let newTodos=[...todos];
    newTodos.splice(index,1);
    setTodos(newTodos);
  }

  const onToggleAll=()=>{
    let newTodos=[...todos];
    const isOneIncompleted=newTodos.some((todo)=>!todo.completed);
    newTodos.forEach((todo)=>todo.completed=isOneIncompleted);
    setTodos(newTodos);
  }

  const onSwitchToInput=(index)=>{
    setPressIndex(index);
    let newTodos=[...todos];
    newTodos[index].inputMode=true;
    setTodos(newTodos);
  }

  const onTodoChangeText=(text,index) => {
    let newTodos = [...todos];
    newTodos[index].text = text;
    setTodos(newTodos);
  }

  const onTodoEndEditing=(index) => {
    let newTodos = [...todos];
    newTodos[index].inputMode = false;
    setTodos(newTodos);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.task}>
            <TouchableOpacity style={styles.selectAllButton} onPress={onToggleAll}>
              <SelectAll width={30} height={30}/>
            </TouchableOpacity>
            <TextInput
              value={task}
              placeholder="Yapılacak listesine ekle..."
              onChangeText={(text) => setTask(text)}
              style={styles.input}
            />
            <TouchableOpacity style={styles.addButton} onPress={onAddTask}>
              <Text style={{ color: "white" }}>Ekle</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.todos}>
            {todos.map((todo, index) => (
              <View key={index} style={styles.entry}>
                <View style={styles.checkboxWithText}>
                  <CheckBox
                    value={todo.completed}
                    onValueChange={() => {
                      onToggle(index);
                    }}
                    style={styles.checkbox}
                  />
                  {todo.inputMode ? (
                      <TextInput
                        ref={todoRefs.current[index]}
                        value={todo.text}
                        onChangeText={(text) => onTodoChangeText(text, index)}
                        style={styles.inputEditMode}
                        onBlur={() => onTodoEndEditing(index)}
                      />
                  ) : (
                    <Text style={ todo.completed ? styles.completed : styles.incompleted }
                      onPress={() => onSwitchToInput(index)}
                    >
                      {todo.text}
                    </Text>
                  )}
                </View>
                <TouchableOpacity style={styles.deleteButton} onPress={()=>onDeleteTask(index)}>
                  <DeleteIcon width={30} height={30} style={styles.deleteIcon}/>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.step1}>
        </View>

        <View style={styles.step2}>
        </View>

        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },

  subContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Android Shadow
    elevation: 5,
  },

  step1:{
    width: 280,
    height: 10,
    borderWidth: 1,
    borderColor:'#dadada', 
    backgroundColor:'#fff',
    elevation: 5,
  },

  step2:{
    width: 260,
    height: 10,
    borderWidth: 1,
    borderColor:'#dadada', 
    backgroundColor:'#fff',
    elevation: 5,
  },

  task: {
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    width: 300,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderBottomWidth: 0,
    paddingLeft: 10,
    borderColor: "#dadada",
    flex: 1,
    fontSize: 14,
  },

  addButton: {
    height: 50,
    justifyContent: "center",
    backgroundColor: "#009688", // Green
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderColor: "#009688",
  },

  todos: {
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#dadada",
    width: 300,
  },

  entry: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderWidth:1,
    borderBottomWidth:0,
    borderColor: "#dadada",
  },

  checkboxWithText:{
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
    paddingLeft: 5,
  },

  checkbox: {
    borderColor: "#dadada",
    borderRadius: 20,
    width: 30,
    height: 30,
  },

  incompleted: {
    fontSize: 16,
    textDecorationLine: "none",
  },

  completed: {
    fontSize: 16,
    textDecorationLine: "line-through",
    fontStyle: "italic",
    color: "#dadada",
  },
  
  deleteButton: {
    marginRight: 15,
  },

  selectAllButton: {
    marginLeft: 5,
    marginRight: 5
  },

  inputEditMode: {
    height: 50,
    borderWidth: 1,
    // borderBottomWidth: 0,
    paddingLeft: 10,
    // borderColor: "#dadada",
    flex: 1,
    fontSize: 16,
  },

});
