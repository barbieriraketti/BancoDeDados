/* Segunda parte do Projeto */

//Nome: Joao Pedro N J BARBIERI
//RA: 22.120.049-6
//Nome: Fabio Augusto Schiavi Morpanini
//RA: 22.121.094-1
// Query que retorna qual estudante fez qual disciplina do próprio orientador.
db.student.aggregate([
   // Faz uma junção com a coleção "advisor" usando o campo "id" do estudante e "s_id" do orientador.
   {
       $lookup: {
           from: "advisor",
           localField: "id",
           foreignField: "s_id",
           as: "advisor"
       }
   },
   // Desdobra os resultados da junção "advisor".
   {
       $unwind: "$advisor"
   },
   // Faz uma nova junção com a coleção "instructor" usando o campo "i_id" do orientador e "id" do instrutor.
   {
       $lookup: {
           from: "instructor",
           localField: "advisor.i_id",
           foreignField: "id",
           as: "instructor"
       }
   },
   // Desdobra os resultados da junção "instructor".
   {
       $unwind: "$instructor"
   },
   // Faz uma junção com a coleção "takes" usando o campo "id" do estudante e "id" da relação takes.
   {
       $lookup: {
           from: "takes",
           localField: "id",
           foreignField: "id",
           as: "takes"
       }
   },
   // Desdobra os resultados da junção "takes".
   {
       $unwind: "$takes"
   },
   // Faz uma última junção com a coleção "course" usando o campo "course_id" da relação takes e "course_id" da disciplina.
   {
       $lookup: {
           from: "course",
           localField: "takes.course_id",
           foreignField: "course_id",
           as: "course"
       }
   },
   // Desdobra os resultados da junção "course".
   {
       $unwind: "$course"
   },
   // Projeta os campos desejados para a saída final.
   {
       $project: {
           "Estudante": "$name",
           "Instrutor": "$instructor.name",
           "Disciplina": "$course.title"
       }
   }
]);

// Query para encontrar salas compartilhadas por professores.
db.classroom.aggregate([
  // Faz uma junção com a coleção "section" usando o campo "room_number" da sala e "room_number" da seção.
  {
      $lookup: {
          from: "section",
          localField: "room_number",
          foreignField: "room_number",
          as: "section"
      }
  },
  // Desdobra os resultados da junção "section".
  {
      $unwind: "$section"
  },
  // Faz uma nova junção com a coleção "teaches" usando o campo "course_id" da seção e "course_id" da relação teaches.
  {
      $lookup: {
          from: "teaches",
          localField: "section.course_id",
          foreignField: "course_id",
          as: "teaches"
      }
  },
  // Desdobra os resultados da junção "teaches".
  {
      $unwind: "$teaches"
  },
  // Faz uma última junção com a coleção "instructor" usando o campo "id" da relação teaches e "id" do instrutor.
  {
      $lookup: {
          from: "instructor",
          localField: "teaches.id",
          foreignField: "id",
          as: "instructor"
      }
  },
  // Desdobra os resultados da junção "instructor".
  {
      $unwind: "$instructor"
  },
  // Projeta os campos desejados para a saída final.
  {
      $project: {
          "name": "$instructor.name",
          "building": 1,
          "room_number": 1
      }
  },
  // Agrupa os resultados com base no nome do instrutor, prédio e número da sala, contando quantas vezes cada combinação ocorre.
  {
      $group: {
          _id: { "name": "$name", "building": "$building", "room_number": "$room_number" },
          uniqueIds: { $addToSet: "$_id" },
          count: { $sum: 1 }
      }
  },
  // Filtra os resultados para incluir apenas aqueles onde a contagem é maior que 1, ou seja, onde uma sala é compartilhada por mais de um professor.
  {
      $match: {
          count: { $gt: 1 }
      }
  }
]);

// Query para obter informações sobre departamentos.
db.department.aggregate([
 {
     // Faz uma junção com a coleção "student" usando o campo "dept_name" do departamento e "dept_name" do estudante.
     $lookup: {
         from: "student",
         localField: "dept_name",
         foreignField: "dept_name",
         as: "students"
     }
 },
 // Desdobra os resultados da junção "students".
 {
     $unwind: "$students"
 },
 // Faz uma nova junção com a coleção "instructor" usando o campo "dept_name" do departamento e "dept_name" do instrutor.
 {
     $lookup: {
         from: "instructor",
         localField: "dept_name",
         foreignField: "dept_name",
         as: "instructors"
     }
 },
 // Desdobra os resultados da junção "instructors".
 {
     $unwind: "$instructors"
 },
 // Agrupa os resultados com base no nome do departamento, contando o número de alunos e calculando a média salarial dos instrutores.
 {
     $group: {
         _id: "$dept_name",
         count: { $sum: 1 },
         avgSalary: { $avg: "$instructors.salary" }
     }
 },
 // Projeta os campos desejados para a saída final.
 {
     $project: {
         dept_name: "$_id",
         budget: 1,
         studentCount: "$count",
         averageSalary: "$avgSalary"
     }
 }
]);
