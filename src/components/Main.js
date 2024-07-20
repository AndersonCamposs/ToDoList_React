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
    tarefas: [],
    index: -1 // se = -1, eu estou criando coisas, se != -1,
    // eu estou editando
  }

  // executa uma vex assim que o component for montado
  componentDidMount() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas'));
    if (!tarefas) return;
    this.setState({
      tarefas
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { tarefas } = this.state;
    if (tarefas === prevState.tarefas) return;
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { tarefas, index } = this.state;
    let { novaTarefa } = this.state;
    novaTarefa = novaTarefa.trim();

    if (tarefas.indexOf(novaTarefa) != -1) return;
    if (novaTarefa === '') return;
    // foi necessário criar outro array e não simplesmente adicionar a
    // nova tarefa diretamente, pois isso alteraria diretamente o estado
    // pois "tarrefas é uma referência"
    const tarefasAtualizadas = [...tarefas];

    if (index === -1) {
      this.setState({
        novaTarefa: '',
        tarefas: [...tarefasAtualizadas, novaTarefa],
      })
    } else {
      let { novaTarefa } = this.state;
      tarefasAtualizadas[index] = novaTarefa;
      this.setState({
        novaTarefa: '',
        tarefas: tarefasAtualizadas,
        index: -1
      })
    }

  }

  handleDelete = (e, index) => {
    const { tarefas } = this.state;
    const tarefasAtualizadas = [...tarefas];
    tarefasAtualizadas.splice(index, 1);

    this.setState({
      tarefas: tarefasAtualizadas,
    })
  }

  handleEdit = (e, index) => {
    const { tarefas } = this.state;
    this.setState({
      index,
      novaTarefa: tarefas[index],
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
            { tarefas.map((tarefa, index) => (
              <li key={ tarefa }>
                { tarefa }
                <span>
                  <FaEdit  onClick={(e) => this.handleEdit(e, index)} className='edit'/>
                  <FaWindowClose onClick={(e) => this.handleDelete(e, index)} className='delete'/>
                </span>
              </li>
            )) }
        </ul>
      </div>
    );
  }
}

