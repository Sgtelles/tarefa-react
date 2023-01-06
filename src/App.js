import React,{Component} from 'react';
import './App.css';
import {FaPlus,FaTrash} from 'react-icons/fa'
import api from './services/api'


export default class App extends Component {

  state = {
    tarefas:[],
    tarefa:"",
    descricao:"",
    responsavel:""
  }

  novaTarefa(){
    api.post('novaTarefa',{
      tarefa:this.state.tarefa,
      descricao:this.state.descricao,
      responsavel:this.state.responsavel
    }).then(resp=>{
      console.log(resp.data)
    })
  }

  async carregarTarefas(){
    await api.get('tarefas').then(resp=>{
      console.log(resp.data)
      this.setState({tarefas:resp.data})
    })
  }

  componentDidMount(){
    this.carregarTarefas()
  }

  editarDados(id){
    tarefas[id] 
  }


  render(){
  return (
    <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first">
            <h3>Lista de Tarefas</h3>
          </div>
          <div>
            <div className="form-row">
              <div className="form-group col-10">
                <input style={{marginTop:25}} type="text" className="form-control" 
                id="tarefa"  placeholder="Digite o nome da tarefa" 
                value = {this.state.tarefa} onChange={
                  (e)=>{this.setState({tarefa:e.target.value})}
                }/>    
              </div>
              <div className="form-group col-10">
                <input style={{marginTop:25}} type="text" className="form-control" 
                id="descricao" placeholder="Digite a Descrição" 
                value = {this.state.descricao} onChange={
                  (e)=>{this.setState({descricao:e.target.value})}
                }/>    
              </div>
              <div className="form-group col-10">
                <input style={{marginTop:25}} type="text" className="form-control" 
                id="responsavel" placeholder="Digite o Responsável" 
                value = {this.state.responsavel} onChange={
                  (e)=>{this.setState({responsavel:e.target.value})}
                }
                required/>    
              </div>
              </div>
              <div className="form-row">
              <div className="form-group col-10 cotainer-fluid" style={{marginTop:25}}>
              <button onClick={()=>{this.novaTarefa()}} className="btn btn-success col-10 "><FaPlus ></FaPlus></button>
              </div>
            
            </div>
            <hr style={{marginTop:25,marginBottom:25}}></hr>
            <div className="titulo2">
              <h4>Tarefas Criadas</h4>
            </div>
            {this.state.tarefas.map(tarefa =>
              <div className="task" key={tarefa.id} onClick={this.editarDados(tarefa.id)} >
                <div className="taskItem"> 
                  <div>Tarefa: {tarefa.tarefa}</div>
                  <div>Descrição: {tarefa.descricao == null?"Nenhuma Descrição":tarefa.descricao}</div>
                  <div>Responsável: {tarefa.responsavel}</div>
                </div>
                
                <FaTrash className="trashIcon"></FaTrash>
              </div>    
            )}
                
          </div>
        </div>
      </div>
  );
}
}