// Nome: Joao Pedro N J BARBIERI
// RA: 22.120.049-6

// Seleciona o banco de dados mongodbVSCodePlaygroundDB
use('mongodbVSCodePlaygroundDB');

// Insere documentos na coleção 'classroom'
db.getCollection('classroom').insertOne(
    {"building": "Packard", "room_number": 101, "capacity": 500}
);
db.getCollection('classroom').insertOne(
    {"building": "Painter", "room_number": 514, "capacity": 10}
);
// ... (continuar inserindo documentos na coleção 'classroom')

// Insere documentos na coleção 'department'
db.getCollection('department').insertOne(
    {"dept_name": "Biology", "building": "Watson", "budget": 90000}
);
// ... (continuar inserindo documentos na coleção 'department')

// Insere documentos na coleção 'course'
db.getCollection('course').insertOne(
    {"course_id": "BIO-101", "title": "Intro. to Biology", "dept_name": "Biology", "credits": 4}
);
// ... (continuar inserindo documentos na coleção 'course')

// Insere documentos na coleção 'instructor'
db.getCollection('instructor').insertOne(
    {"ID": "10101", "name": "Srinivasan", "dept_name": "Comp. Sci.", "salary": 65000}
);
// ... (continuar inserindo documentos na coleção 'instructor')

// Insere documentos na coleção 'section'
db.getCollection('section').insertOne(
    {"course_id": "BIO-101", "sec_id": "1", "semester": "Summer", "year": 2017, "building": "Painter", "room_number": 514, "time_slot_id": "B"}
);
// ... (continuar inserindo documentos na coleção 'section')

// Insere documentos na coleção 'teaches'
db.getCollection('teaches').insertOne(
    {"ID": "10101", "course_id": "CS-101", "sec_id": "1", "semester": "Fall", "year": 2017}
);
// ... (continuar inserindo documentos na coleção 'teaches')

// Insere documentos na coleção 'student'
db.getCollection('student').insertOne(
    {"ID": "00128", "name": "Zhang", "dept_name": "Comp. Sci.", "tot_cred": 102}
);
// ... (continuar inserindo documentos na coleção 'student')

// Insere documentos na coleção 'takes'
db.getCollection('takes').insertOne(
    {"ID": "00128", "course_id": "CS-101", "sec_id": "1", "semester": "Fall", "year": 2017, "grade": "A"}
);
// ... (continuar inserindo documentos na coleção 'takes')

// Insere documentos na coleção 'advisor'
db.getCollection('advisor').insertOne(
    {"s_ID": "00128", "i_ID": "45565"}
);
// ... (continuar inserindo documentos na coleção 'advisor')

// Insere documentos na coleção 'time_slot'
db.getCollection('time_slot').insertOne(
    {"time_slot_id": "A", "day": "M", "start_hr": 8, "start_min": 0, "end_hr": "8", "end_min": 50}
);
// ... (continuar inserindo documentos na coleção 'time_slot')

// Insere documentos na coleção 'prereq'
db.getCollection('prereq').insertOne(
    {"course_id": "BIO-301", "prereq_id": "BIO-101"}
);
// ... (continuar inserindo documentos na coleção 'prereq')
