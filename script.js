let alunos = [];

const alunoList = document.getElementById("alunoList");
const alunoDetails = document.getElementById("alunoDetails");
const searchInput = document.getElementById("searchInput");
const addAlunoBtn = document.getElementById("addAlunoBtn");
const addAlunoForm = document.getElementById("addAlunoForm");
const salvarAluno = document.getElementById("salvarAluno");
const cancelarAluno = document.getElementById("cancelarAluno");

function calculateAge(dateStr) {
  if (!dateStr) return '';
  const birth = new Date(dateStr);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

function renderList(filter = "") {
  alunoList.innerHTML = "";
  const filtered = alunos.filter(a => a.Nome.toLowerCase().includes(filter.toLowerCase()));
  filtered.forEach((aluno, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${aluno.Nome}</strong><br><small>${aluno["Fase de Ensino"]}</small>`;
    li.onclick = () => showAluno(aluno, index);
    alunoList.appendChild(li);
  });
}

function showAluno(aluno, index) {
  const fotoNome = aluno.Nome.trim().replace(/ /g, "_") + ".jpg";
  alunoDetails.innerHTML = `
    <button onclick="closeDetails()">⬅ Voltar</button>
    <div class="card">
      <img src="imagens/${fotoNome}" onerror="this.src='https://via.placeholder.com/200'" />
      <h3>${aluno.Nome}</h3>
      <p><strong>RA:</strong> ${aluno.RA}-${aluno["RA Dígito"]}</p>
      <p><strong>Data de Nascimento:</strong> ${aluno["Data de Nascimento"]}</p>
      <p><strong>Idade:</strong> ${calculateAge(aluno["Data de Nascimento"])} anos</p>
      <p><strong>Fase de Ensino:</strong> ${aluno["Fase de Ensino"]}</p>
      <p><strong>Contato:</strong> ${aluno.Contato}</p>
      <button onclick="excluirAluno(${index})">🗑️ Excluir</button>
    </div>
  `;
  alunoDetails.classList.remove("hidden");
  alunoList.innerHTML = "";
}

function closeDetails() {
  alunoDetails.classList.add("hidden");
  renderList(searchInput.value);
}

function excluirAluno(index) {
  if (confirm("Tem certeza que deseja excluir este aluno?")) {
    alunos.splice(index, 1);
    saveToStorage();
    closeDetails();
  }
}

function saveToStorage() {
  localStorage.setItem("alunos", JSON.stringify(alunos));
}

function loadFromStorage() {
  const stored = localStorage.getItem("alunos");
  if (stored) {
    alunos = JSON.parse(stored);
    renderList();
  }
}

searchInput.addEventListener("input", () => renderList(searchInput.value));

addAlunoBtn.onclick = () => {
  addAlunoForm.classList.remove("hidden");
  alunoDetails.classList.add("hidden");
};

cancelarAluno.onclick = () => {
  addAlunoForm.classList.add("hidden");
};

salvarAluno.onclick = () => {
  const aluno = {
    Nome: document.getElementById("novoNome").value,
    RA: document.getElementById("novoRA").value,
    "RA Dígito": document.getElementById("novoRADigito").value,
    "Data de Nascimento": document.getElementById("novoNascimento").value,
    "Fase de Ensino": document.getElementById("novoFase").value,
    Contato: document.getElementById("novoContato").value
  };
  alunos.push(aluno);
  saveToStorage();
  renderList();
  addAlunoForm.classList.add("hidden");
};

window.onload = () => {
  fetch('alunos.json')
    .then(res => res.json())
    .then(data => {
      alunos = data;
      saveToStorage();
      renderList();
    })
    .catch(() => {
      loadFromStorage();
    });
};
