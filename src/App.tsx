import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import PomodoroTimer from './components/PomodoroTimer'
import TodoList from './components/TodoList'
import Quote from './components/Quote'


function App() {

  return (
    <div className='container '>
      <h1 className="text-center my-4">Productivity Desk</h1>
      <div className='row' >
        <div className='col-md-6 mb-3'><Quote /></div>
        <div className='col-md-6 mb-3'><PomodoroTimer /></div>
      </div>
      
      <div className="row">
        <div className="col">
          <TodoList />
        </div>
      </div>
    </div>
  )
}

export default App
