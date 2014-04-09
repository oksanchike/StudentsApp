﻿window.onload = function () {
    var pageController = new PageController();
};

var PageController = Base.extend({
    constructor: function () {
        this.studentDetails = new StudentDetails();
        this.students = new StudentsRepository();
        this.subjects = new SubjectsRepository();
        this.studentsPresences = new StudentsPresenceRepository();
        this.studentsList = new StudentsList(document.getElementById("MainMenu"));
        //var studentsPresences = this.studentsPresence.getAll();
        var groups = this.students.getGroups();
        this.groups = new Groups(groups);
        var subjects = this.subjects.getAll();
        this.studentDetails.initalizeSubjects(subjects);
        this.setList(this.groups.activeGroup);
        this.__initEventHandlers();
    },
    setList: function (group) {
        this.studentsList.deleteAllStudents();
        var self = this;
        var students = this.students.getByGroup(group);       
        students.forEach(function (currentStudent) {
            self.studentsList.addStudent();
            self.studentsList.save(currentStudent);
        });

        this.studentsList.setActive(this.studentsList.list.firstChild);
        this.setStudent(students[0].id);
    },
    addStudent: function () {
        this.studentsList.addStudent();
        this.studentDetails.resetStudent();
    },
    saveStudent: function () {
        var details = this.studentDetails.serialize();
        var student = details.student;
        var presences = details.presences;
        var valid = this.studentDetails.save(student);
        if (valid) {
            this.students.save(student);
            this.studentsPresences.save(presences, student.id);
            this.studentsList.save(student);
        }
    },
    deleteStudent: function () {
        var student = this.studentDetails.serialize();
        this.students.deleteStudent(student);
        this.studentsList.deleteStudent();
    },
    setStudent: function (id) {
        var student = this.students.getById(id);
        var studentPresences = this.studentsPresences.getByStudentId(id);
        var subjects = [];
        for (var i = 0; i < studentPresences.length; i++) {
            var subjectId = studentPresences[i].subjectId;
            var subject = this.subjects.getById(subjectId);
            subjects.push(subject);
        }
        this.studentDetails.resetValidation();
        if (student !== null)
            this.studentDetails.setStudent(student, studentPresences, subjects);
        else
            this.studentDetails.resetStudent();
    },
    __initEventHandlers: function () {
        var self = this;
        this.groups.div1.addEventListener('groupChanged', function (e) {
            self.setList(e.detail.group);
        })
        this.studentsList.list.addEventListener('studentChanged', function (e) {
            self.setStudent(e.detail.id);
        });
        document.getElementById('AddStudent').onclick = function () {
            self.addStudent();
        };
        document.getElementById('SaveСhanges').onclick = function () {
            self.saveStudent();
        };
        document.getElementById('DeleteStudent').onclick = function () {
            self.deleteStudent();
        };
        document.getElementById('Print').onclick = function () {
            window.print();
        };
        document.getElementById('Groups').onclick = function (event) {
            event.stopPropagation();
            self.groups.clickGroups();
        };
        document.onclick = function () {
            self.groups.close();
        };
        
    }
});
