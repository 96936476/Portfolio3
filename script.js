// Smooth Scroll
document.querySelectorAll('nav ul li a').forEach(link=>{
  link.addEventListener('click',e=>{
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({behavior:'smooth'});
  });
});

// Dark Mode
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click',()=>{
  document.body.classList.toggle('dark');
  themeToggle.textContent=document.body.classList.contains('dark')?'☀️':'🌙';
});

// Skill Animation
const skillBars = document.querySelectorAll('.skill-bar div');
function animateSkills(){
  const trigger = window.innerHeight/1.2;
  skillBars.forEach(skill=>{
    const top = skill.getBoundingClientRect().top;
    if(top<trigger) skill.style.width = skill.style.width || skill.getAttribute('style');
  });
}
window.addEventListener('scroll',animateSkills);

// Contact Form
const form = document.getElementById('contact-form');
const formMsg = document.getElementById('form-message');
form.addEventListener('submit', e=>{e.preventDefault(); formMsg.textContent='Message sent! (Demo)'; form.reset();});

// Modals
const viewBtns=document.querySelectorAll('.view-btn');
const modals=document.querySelectorAll('.modal');
const closeBtns=document.querySelectorAll('.modal .close');
viewBtns.forEach(btn=>btn.addEventListener('click',()=>{
  const id=btn.parentElement.getAttribute('data-project');
  document.getElementById(`modal-${id}`).style.display='block';
}));
closeBtns.forEach(btn=>btn.addEventListener('click',()=>{btn.parentElement.parentElement.style.display='none';}));
window.addEventListener('click',e=>{modals.forEach(m=>{if(e.target===m)m.style.display='none';});});

// Project 1 Color Game
const colorBox=document.getElementById('color-box');
const colorBtns=document.querySelectorAll('#project1-content .color-btn');
const result=document.getElementById('result');
const resetBtn=document.getElementById('reset-btn');
let correctColor;
function randomColor(){return `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`;}
function setupColorGame(){
  const colors=[randomColor(),randomColor(),randomColor()];
  correctColor=colors[Math.floor(Math.random()*3)];
  colorBox.style.backgroundColor=correctColor;
  colorBtns.forEach((b,i)=>{b.textContent=colors[i]; b.style.backgroundColor=colors[i]; b.style.color='white';});
  result.textContent='';
}
colorBtns.forEach(btn=>btn.addEventListener('click',()=>{result.textContent = btn.textContent===correctColor?'Correct! 🎉':'Wrong!';}));
resetBtn.addEventListener('click',setupColorGame);
document.querySelector('[data-project="1"] .view-btn').addEventListener('click',setupColorGame);

// Project 3 Quiz App
const quizData=[
  {q:"What is HTML?",options:["Language","Framework","Database","OS"],answer:"Language"},
  {q:"CSS stands for?",options:["Cascading Style Sheets","Color Style Sheets","Computer Style Sheets","Creative Style Sheets"],answer:"Cascading Style Sheets"},
  {q:"JS stands for?",options:["JavaScript","JavaServer","JustScript","JsonScript"],answer:"JavaScript"}
];
let currentQ=0,score=0;
const questionEl=document.getElementById('quiz-question');
const optionsEl=document.getElementById('quiz-options');
const scoreEl=document.getElementById('score');
const nextBtn=document.getElementById('next-btn');
function loadQuestion(){
  const q=quizData[currentQ];
  questionEl.textContent=q.q;
  optionsEl.innerHTML='';
  q.options.forEach(opt=>{
    const btn=document.createElement('button');
    btn.textContent=opt;
    btn.classList.add('option-btn');
    btn.addEventListener('click',()=>{if(opt===q.answer){score++; alert("Correct!");} else{alert("Wrong!");} scoreEl.textContent=`Score: ${score}`;});
    optionsEl.appendChild(btn);
  });
  scoreEl.textContent=`Score: ${score}`;
}
nextBtn.addEventListener('click',()=>{
  currentQ++;
  if(currentQ>=quizData.length){alert(`Quiz Finished! Score: ${score}`);currentQ=0;score=0;}
  loadQuestion();
});
document.querySelector('[data-project="3"] .view-btn').addEventListener('click',loadQuestion);
