window.onload = function () {
    var pageController = new PageController();
};

var PageController = Base.extend({
    constructor: function () {
        this.studentDetails = new StudentDetails();
        this.students = new StudentsRepository();
        this.studentsList = new StudentsList(document.getElementById("MainMenu"));
        var self = this;
        var students = this.students.getAll();
        students.each(function (currentStudent, recordnumber) {
            self.studentsList.addStudent();
            self.studentsList.save(currentStudent);
        });
        this.studentsList.setActive(this.studentsList.list.firstChild);
        var student = students.order("surname asec").first();
        this.studentDetails.setStudent(student);
        this.__initEventHandlers();
        this.studentsList.list.addEventListener('studentChanged', function (e) {
            self.setStudent(e.detail.id);
        });
    },
    addStudent: function () {
        this.studentsList.addStudent();
        this.studentDetails.resetStudent();
    },
    saveStudent: function () {
        var student = this.studentDetails.serialize();
        var valid = this.studentDetails.save(student);
        if (valid) {
            this.students.save(student);
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
        if (student !== null)
            this.studentDetails.setStudent(student);
        else
            this.studentDetails.resetStudent();
    },
    __initEventHandlers: function () {
        var pageController = this;
        document.getElementById('AddStudent').onclick = function () {
            pageController.addStudent();
        };
        document.getElementById('SaveСhanges').onclick = function () {
            pageController.saveStudent();
        };
        document.getElementById('DeleteStudent').onclick = function () {
            pageController.deleteStudent();
        };
        document.getElementById('Print').onclick = function () {
            window.print();
        };
    }
});
