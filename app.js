let alunos = [];

// Carregar dados do JSON localmente
fetch('alunos.json')
  .then(response => response.json())
  .then(data => {
    alunos = data;
    renderizarAlunos(alunos);
  })
  .catch(error => console.error('Erro ao carregar dados:', error));

// Renderizar lista de alunos
function renderizarAlunos(lista) {
  const ul = document.getElementById('lista-alunos');
  ul.innerHTML = '';
  lista.forEach(aluno => {
    const li = document.createElement('li');
    li.textContent = aluno.nome;
    li.addEventListener('click', () => mostrarDetalhes(aluno));
    ul.appendChild(li);
  });
}

// Mostrar detalhes do aluno
function mostrarDetalhes(aluno) {
  const detalhes = document.getElementById('detalhes-aluno');
  document.getElementById('foto-aluno').src = `imagens/${aluno.nome.replace(/ /g, '_')}.jpg`;
  document.getElementById('nome-aluno').textContent = aluno.nome;
  document.getElementById('fase-aluno').textContent = aluno.fase_ensino;
  document.getElementById('turma-aluno').textContent = aluno.turma;
  document.getElementById('responsavel-aluno').textContent = aluno.responsavel;
  document.getElementById('telefone-aluno').textContent = aluno.telefone;
  detalhes.classList.remove('hidden');
}

// Filtro de busca
document.getElementById('busca').addEventListener('input', (event) => {
  const termo = event.target.value.toLowerCase();
  const filtrados = alunos.filter(aluno =>
    aluno.nome.toLowerCase().includes(termo) ||
    aluno.fase_ensino.toLowerCase().includes(termo)
  );
  renderizarAlunos(filtrados);
});