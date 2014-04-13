var PageController = Base.extend({
    constructor: function() {
        this.__studentDetails = new StudentDetails();
        this.__students = new StudentsRepository();
        this.__subjects = new SubjectsRepository();
        this.__studentsPresences = new StudentsPresenceRepository();
        this.__studentsList = new StudentsList(document.getElementById("MainMenu"));
        var groups = this.__students.getGroups();
        this.groups = new GroupsSelect(groups);
        var subjects = this.__subjects.getAll();
        this.__studentDetails.initalizeSubjects(subjects);
        this.__setListForGroup(this.groups.activeGroup.innerText);
        this.__initEventHandlers();
    },
    __setListForGroup: function(group) {
        this.__studentsList.deleteAllStudents();
        var self = this;
        var students = this.__students.getByGroup(group);
        students.forEach(function(student) {
            self.__studentsList.addNewStudent();
            self.__studentsList.save(student);
        });
        this.__studentsList.setActive(this.__studentsList.list.firstChild);
        this.__setStudent(students[0].id);
    },
    __addNewStudent: function() {
        this.__studentsList.addNewStudent();
        this.__studentDetails.resetStudent();
    },
    __saveStudent: function() {
        var isValid = this.__studentDetails.validate();
        if (isValid) {
            var details = this.__studentDetails.serialize();
            var student = details.student;
            var presences = details.presences;
            this.__students.save(student);
            this.__studentsPresences.save(presences, student.id);
            this.__studentsList.save(student);
        }
    },
    __deleteStudent: function() {
        var studentId = this.__studentsList.getActiveId();
        this.__students.deleteStudentById(studentId);
        this.__studentsList.deleteStudent();
    },
    __setStudent: function(id) {
        var student = this.__students.getById(id);
        this.__studentDetails.resetValidation();
        if (student !== null) {
            var studentPresences = this.__studentsPresences.getByStudentId(id);
            var subjects = [];
            for (var i = 0; i < studentPresences.length; i++) {
                var subjectId = studentPresences[i].subjectId;
                var subject = this.__subjects.getById(subjectId);
                subjects.push(subject);
            }
            this.__studentDetails.setStudent(student, studentPresences, subjects);
        } else
            this.__studentDetails.resetStudent();
    },
    __initEventHandlers: function() {
        var self = this;
        EventHelpers.addEvent(this.groups.groupsList, "groupChanged", function (e) {
            self.__setListForGroup(e.detail.group.innerText);
        });
        EventHelpers.addEvent(this.__studentsList.list, "studentChanged", function (e) {
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
            self.groups.__close();
        };

    }
});