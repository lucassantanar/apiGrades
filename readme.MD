<h1> ApiGrades <h1>

<hr />

Esta API foi gerada, a partir, de um desafio para o Bootcamp-Fullstack do Instituto de Gestão e Tecnologia da Informação - IGTI, onde o objetivo era construir uma API de grade de alunos em Node.JS com Express e, manipulando um arquivo JSON, elaborar endpoints para consulta, remoção, alteração e inserção de dados neste arquivo, utilizando o módulo FileSystem.

<hr />

<h2> Tecnologias <h2>

<ul>
  <li>Node.Js</li>
  <li>Express</li>
  <li>FileSystem</li>
</ul>

<h2>EndPoints<h2>

<ul>
  <li>GET: localhost:3000/account/listaGrades    || Parâmetro: Não requer parametros</li>
  <li>GET: localhost:3000/account/:id    || Parâmetro: Por (:id) na requisição </li>
  <li>DEL: localhost:3000/account/:id    || Parâmetro: Não requer parametro </li>
  <li>POST: localhost:3000/account    || Parâmetro: { "student", "subject", "type", "value" } Via body em formato JSON </li>
  <li>PUT: localhost:3000/account     || Parâmetro: { "student", "subject", "type", "value" } Via body em formato JSON</li>
  <li>GET: localhost:3000/account     || Parâmetro: { "student":, "subject": } Via body em formato JSON</li>
  <li>GET: localhost:3000/account     || Parâmetro: { "subject":, "type": } Via body em formato JSON</li>
  <li>GET: localhost:3000/account     || Parâmetro: { "subject":, "type": }  Via body em formato JSON</li>
</ul>

<h2>Ferramentas utilizadas<h2>

<ul>
  <li>Visual Studio - Para desenvolvimento</li>
  <li>Insomnia - Para testagem dos EndPoints </li>
</ul>
