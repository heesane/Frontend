import './App.css';
import { useState } from 'react';
function Header(props) {
  return (
    <h1>
      <a href="/" onClick={ 
         (event)=> {
          event.preventDefault();
          props.onChangeMode();
        }
      }>
        {props.name}
      </a>
    </h1>
  )
}

function Div(props) {
  return (
    <div>
        <h1>{props.title}</h1>
      <p>{ props.body}</p>
      </div>
    )
}

function Nav(props) {
  let lis = [];
  for (let i = 0; i < props.items.length; i++) {
    lis.push(<li key={props.items[i].id}>
      <a href={"/content/" + props.items[i].id}
        onClick={(event) => {
          event.preventDefault();
          props.onChangeMode(props.items[i].id);
        }}
      >{props.items[i].title}</a>
    </li>)
  }

  

  return (
    <nav>
      <ul>
        {lis}
      </ul>
    </nav>
    
  )
}

function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form onSubmit={event => {
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onCreate(title,body);
      }}>
        <p><input type="text" name="title" placeholder="Title"></input></p>
        <p><textarea name="body" placeholder="Body"></textarea></p>
        <p><input type ="submit" value ="Create"></input></p>
      </form>
    </article>
  )
}
function App() {

  const [mode,setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [topic, setTopic] = useState(
    { id: 1, title: 'HTML', body: 'HTML is ...' },
    { id: 2, title: 'CSS', body: 'CSS is ...' },
    { id: 3, title: 'JavaScript', body: 'JavaScript is ...' }
  );
  const items = [
    { id: 1, title: 'HTML', body: 'HTML is ...' },
    { id: 2, title: 'CSS', body: 'CSS is ...' },
    { id: 3, title: 'JavaScript', body: 'JavaScript is ...' }

  ];

  let content = null;

  if (mode === 'WELCOME') {
    content = <Div title="Welcome" body="Hello, Web"></Div>
  }
  else if (mode === 'READ') {
    let title, body = null;
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        title = items[i].title;
        body = items[i].body;
      }
      content = <Div title={title} body={body}></Div>
    }
  }
  else if (mode === 'CREATE') {
    content = <Create onCreate={(title, body) => {
      const len = items.length;
      const _id = items[len - 1].id + 1;
      const newItem = {id : _id ,title:title,body:body}
      setTopic(newItem);
    }}></Create>
  }
  return (
    <div>
      <Header name="kkkk" onChangeMode={()=> {
        setMode("WELCOME")
      }}></Header>
      <Nav items={items} onChangeMode={(_id) => {
        setMode("READ")
        setId(_id);
      }
        
      }></Nav>
      {content}
      <a href="/create" onClick={event => {
        event.preventDefault();
        setMode("CREATE")

      }}>create</a>
    </div>
    
  );
}

export default App;
