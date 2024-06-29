import React, { useState } from 'react';
import { FlatList, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  const addTodo = () => {
    if (title.trim() !== '') {
      const newTodo = {
        id: Math.random().toString(), 
        title: title,
        status: 'due', 
      };
      setTodos([...todos, newTodo]);
      setTitle('');
    }
  };

  const updateTodoStatus = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, status: todo.status === 'due' ? 'done' : 'due' };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text style={[styles.todoTitle, item.status === 'done' && styles.completedText]}>{item.title}</Text>
      <View style={styles.actions}>
      <TouchableOpacity onPress={() => updateTodoStatus(item.id)}>
        <MaterialIcons
          name={item.status === 'due' ? 'check-box-outline-blank' : 'check-box'}
          size={24}
          color={item.status === 'done' ? '#4CAF50' : '#ccc'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTodo(item.id)}>
        <MaterialIcons name="delete" size={24} color="#f44336" />
      </TouchableOpacity>
      </View>
      
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Add a task..."
        onChangeText={setTitle}
        value={title}
      />
      <TouchableOpacity
        style={styles.addButton}
        disabled={!title.trim()}
        onPress={addTodo}
      >
        <Text style={styles.addButtonText}>ADD TASK</Text>
      </TouchableOpacity>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
  textInput: {
    fontSize: 18,
    marginBottom: 10,
    padding: 8,
    backgroundColor: '#eee',
  },
  addButton: {
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'green'
  },
  addButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  todoTitle: {
    fontSize: 16,
  },
  completedText: {
    color: '#aaa',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default App;
