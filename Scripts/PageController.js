window.onload = function () {
    var pageController = new PageController();
}

var PageController = Base.extend({
    constructor: function () {
        this.studentDetails = new StudentDetails();
        this.studentsList = new StudentsList(document.getElementById("MainMenu"));
        var self = this;
        new Database().data.order("surname desc").each(function (currentStudent, recordnumber){
            self.studentsList.addStudent(currentStudent);
            self.studentsList.active.addEventListener('click', function () {
                self.studentDetails.setStudent(currentStudent);
            });
        });
        var student = new Database().data.order("surname asec").first();
        this.studentDetails.setStudent(student);
        this.__initEventHandlers();
    },
    addStudent: function () {
        this.studentsList.addStudent();
        this.studentDetails.resetStudent();
    },
    saveStudent: function () {
        this.studentsList.saveСhanges();
    },
    deleteStudent: function () {
        this.studentsList.deleteStudent();
        this.studentDetails.setStudent(this.studentsList.active);
    },
    __initEventHandlers: function () {
        var pageController = this;
        document.getElementById('AddStudent').onclick = function () {
            pageController.addStudent();
        }
        document.getElementById('SaveСhanges').onclick = function () {
            pageController.saveStudent();
        }
        document.getElementById('DeleteStudent').onclick = function () {
            pageController.deleteStudent();
        }
    }
});
