const express = require('express');
const app = express();
var i = 0;
const projects = [];

app.use(express.json());
app.use((req, res, next)=>{
  i++;
  console.time(`Requisição #${i}`);
  next();
  
  console.timeEnd(`Requisição #${i}`);
});
function checkProject(req, res, next) {
  const {id} = req.params;
  const project = projects.find(p => p.id == id)
  if (!project) {
    return res.status(400).json({error: 'Projeto não  cadastrado'})
  }
  return next();
}
app.get('/projects', (req, res)=>{
  //Rota que lista todos projetos e suas tarefas;
  res.json(projects)
});
app.post('/projects', (req, res)=>{
  //A rota deve receber id e title dentro do corpo e cadastrar um novo projeto dentro de um array no seguinte formato: { id: "1", title: 'Novo projeto', tasks: [] }; Certifique-se de enviar tanto o ID quanto o título do projeto no formato string com aspas duplas.
  const { id, title} = req.body;
  const post = { id, title, tasks:[]}
  projects.push(post);
  res.json(projects);

});

app.put('/projects/:id', checkProject, (req, res)=>{
  const {title} = req.body
  const {id} = req.params
  const project = projects.find(p => p.id==id)
  project.title = title
  res.json(projects);


  //A rota deve alterar apenas o título do projeto com o id presente nos parâmetros da rota;
});
app.delete('/projects/:id', checkProject, (req, res)=>{
  const {id} = req.params
  const projectIndex = projects.findIndex(p => p.id==id)
  console.log(projectIndex);

  projects.splice(projectIndex,1);
  res.json(projects)
  //A rota deve deletar o projeto com o id presente nos parâmetros da rota;

});
app.post('/projects/:id/tasks', checkProject, (req, res)=>{
  //A rota deve receber um campo title e armazenar uma nova tarefa no array de tarefas de um projeto específico escolhido através do id presente nos parâmetros da rota;
  const {title} = req.body;
  const {id} = req.params;
  projectIndex = projects.findIndex(p=> p.id==id);
  projects[projectIndex].tasks.push(title);
  res.json(projects);

});




app.listen(3333);

