import React, { Component } from 'react';
//form
import { FaPlus } from 'react-icons/fa'
// tasks
import { FaEdit } from 'react-icons/fa'
import { FaWindowClose } from 'react-icons/fa'

import Form from './Form'
import Tasks from './Tasks'

import './Main.css'
// statefull component -> need method render()
export default class Main extends Component {
  state = {
    newTask: '',
    tasks: [],
    index: -1 // se = -1, eu estou criando coisas, se != -1,
    // eu estou editando
  }

  // executa uma vex assim que o component for montado
  componentDidMount() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (!tasks) return;
    this.setState({
      tasks
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { tasks } = this.state;
    if (tasks === prevState.tasks) return;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { tasks, index } = this.state;
    let { newTask } = this.state;
    newTask = newTask.trim();

    if (tasks.indexOf(newTask) != -1) return;
    if (newTask === '') return;
    // foi necessário criar outro array e não simplesmente adicionar a
    // nova tarefa diretamente, pois isso alteraria diretamente o estado
    // pois "tarrefas é uma referência"
    const tarefasAtualizadas = [...tasks];

    if (index === -1) {
      this.setState({
        newTask: '',
        tasks: [...tarefasAtualizadas, newTask],
      })
    } else {
      let { newTask } = this.state;
      tarefasAtualizadas[index] = newTask;
      this.setState({
        newTask: '',
        tasks: tarefasAtualizadas,
        index: -1
      })
    }

  }

  handleDelete = (e, index) => {
    const { tasks } = this.state;
    const tarefasAtualizadas = [...tasks];
    tarefasAtualizadas.splice(index, 1);

    this.setState({
      tasks: tarefasAtualizadas,
    })
  }

  handleEdit = (e, index) => {
    const { tasks } = this.state;
    this.setState({
      index,
      newTask: tasks[index],
    })
  }

  handleChange = (e) => {
    this.setState({
      newTask: e.target.value,
    })
  }

  render() {
    const { newTask, tasks } = this.state;

    return (
      <div className='main'>
        <h1>Lista de Tarefas</h1>

        <Form
        handleChange = {this.handleChange}
        handleSubmit = {this.handleSubmit}
        newTask = {newTask}
        />

        <Tasks
        tasks = {tasks}
        handleEdit = {this.handleEdit}
        handleDelete = {this.handleDelete}
        />
      </div>
    );
  }
}

