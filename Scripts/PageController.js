var PageController = Base.extend({
    constructor: function() {
        this.studentDetails = new StudentDetails();
        this.students = new StudentsRepository();
        this.subjects = new SubjectsRepository();
        this.studentsPresences = new StudentsPresenceRepository();
        this.studentsList = new StudentsList(document.getElementById("MainMenu"));
        var groups = this.students.getGroups();
        this.groups = new GroupsSelect(groups);
        var subjects = this.subjects.getAll();
        this.studentDetails.initalizeSubjects(subjects);
        this.__setListForGroup(this.groups.activeGroup.innerText);
        this.__initEventHandlers();
    },
    __setListForGroup: function(group) {
        this.studentsList.deleteAllStudents();
        var self = this;
        var students = this.students.getByGroup(group);
        students.forEach(function(student) {
            self.studentsList.addNewStudent();
            self.studentsList.save(student);
        });
        this.studentsList.setActive(this.studentsList.list.firstChild);
        this.__setStudent(students[0].id);
    },
    __addNewStudent: function() {
        this.studentsList.addNewStudent();
        this.studentDetails.resetStudent();
    },
    __saveStudent: function() {
        var details = this.studentDetails.serialize();
        var student = details.student;
        var presences = details.presences;
        var isValid = this.studentDetails.validate(student);
        if (isValid) {
            this.students.save(student);
            this.studentsPresences.save(presences, student.id);
            this.studentsList.save(student);
        }
    },
    __deleteStudent: function() {
        var studentId = this.studentsList.getActiveId();
        this.students.deleteStudentById(studentId);
        this.studentsList.deleteStudent();
    },
    __setStudent: function(id) {
        var student = this.students.getById(id);
        this.studentDetails.resetValidation();
        if (student !== null) {
            var studentPresences = this.studentsPresences.getByStudentId(id);
            var subjects = [];
            for (var i = 0; i < studentPresences.length; i++) {
                var subjectId = studentPresences[i].subjectId;
                var subject = this.subjects.getById(subjectId);
                subjects.push(subject);
            }
            this.studentDetails.setStudent(student, studentPresences, subjects);
        } else
            this.studentDetails.resetStudent();
    },
    __initEventHandlers: function() {
        var self = this;
        EventHelpers.addEvent(this.groups.div1, "groupChanged", function (e) {
            self.__setListForGroup(e.detail.group.innerText);
        });
        EventHelpers.addEvent(this.studentsList.list, "studentChanged", function (e) {
            self.__setStudent(e.detail.id);
        });
        document.getElementById("AddStudent").onclick = function() {
            self.__addNewStudent();
        };
        document.getElementById("SaveСhanges").onclick = function() {
            self.__saveStudent();
        };
        document.getElementById("DeleteStudent").onclick = function() {
            self.__deleteStudent();
        };
        document.getElementById("Print").onclick = function() {
            window.print();
        };
        document.getElementById("Groups").onclick = function(event) {
            event.stopPropagation();
            self.groups.clickGroups();
        };
        document.onclick = function() {
            self.groups.close();
        };

    }
});