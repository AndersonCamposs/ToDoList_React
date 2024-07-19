import React, { Component } from 'react';
//form
import { FaPlus } from 'react-icons/fa'
// tarefas
import { FaEdit } from 'react-icons/fa'
import { FaWindowClose } from 'react-icons/fa'

import './Main.css'
// statefull component -> need method render()
export default class Main extends Component {
  state = {
    novaTarefa: '',
    tarefas: []
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { tarefas } = this.state;
    let { novaTarefa } = this.state;
    novaTarefa = novaTarefa.trim();

    if (tarefas.indexOf(novaTarefa) != -1) return;
    // foi necessário criar outro array e não simplesmente adicionar a
    // nova tarefa diretamente, pois isso alteraria diretamente o estado
    // pois "tarrefas é uma referência"
    const tarefasAtualizadas = [...tarefas];

    // altera o estado
    this.setState({
      tarefas: [...tarefasAtualizadas, novaTarefa]
    })

    this.setState({
      novaTarefa: ''
    })
  }

  handleChange = (e) => {
    this.setState({
      novaTarefa: e.target.value,
    })
  }

  render() {
    const { novaTarefa, tarefas } = this.state;

    return (
      <div className='main'>
        <h1>Lista de Tarefas</h1>

        <form onSubmit={this.handleSubmit} action='#' className='form'>
          <input onChange={this.handleChange} type='text' value={novaTarefa}/>
          <button type='submit'> <FaPlus/> </button>
        </form>

        <ul className='tarefas'>
            { tarefas.map((tarefa) => (
              <li key={ tarefa }>
                { tarefa }
                <span>
                  <FaEdit className='edit'/>
                  <FaWindowClose className='delete'/>
                </span>
              </li>
            )) }
        </ul>
      </div>
    );
  }
}

