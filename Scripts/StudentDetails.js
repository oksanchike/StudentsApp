var StudentDetails = Base.extend({
    constructor: function () {
        this.chart = new Chart("draw");
        this.title = document.getElementById('Title-student');
        this.surname = document.getElementById('SurnameStudent');
        this.name = document.getElementById('NameStudent');
        this.patronymic = document.getElementById('PatronymicStudent');
        this.femail = document.getElementById('Female');
        this.male = document.getElementById('Male');
        this.dateOfBirth = document.getElementById('DateOfBirth');
        this.dateOfReceipt = document.getElementById('DateOfReceipt');
        this.validationMessagePatronymic = document.getElementById('validationMessagePatronymic');
        this.validationMessageName = document.getElementById('validationMessageName');
        this.validationMessageSurname = document.getElementById('validationMessageSurname');
    },
    setStudent: function (student, studentPresences, subjects) {
        this.title.innerHTML = student.surname + "&nbsp;" + student.name + "&nbsp;" + student.patronymic;
        this.surname.value = student.surname;
        this.name.value = student.name;
        this.patronymic.value = student.patronymic;
        if (student.gender === 'F')
            this.femail.checked = true;
        else {
            this.femail.checked = false;
            this.male.checked = true;
        }
        this.dateOfBirth.value = student.dateOfBirth;
        this.dateOfReceipt.value = student.dateOfReceipt;
        this.title.setAttribute("data-id", student.id);
        this.__initEventHandlers();
        this.setSubjects(studentPresences);
        this.drawChartForStudent(studentPresences, subjects);
    },
    setSubjects: function (studentPresences) {
        var checkboxes = document.getElementById("subjectsPanel").getElementsByTagName("input");
        for (var i = 0; i < checkboxes.length; i++)
            checkboxes[i].checked = false;
        for (var i = 0; i < studentPresences.length; i++) {
                var checkbox = document.getElementById("subject" + studentPresences[i].subjectId);
                checkbox.checked = studentPresences[i].studying;
        }
    },
    drawChartForStudent: function (studentPresences, subjects) {
        this.chart.drawForStudent(studentPresences, subjects);
    },
    resetStudent: function () {
        this.title.innerHTML = "Новый студент";
        this.title.removeAttribute("data-id");
        this.surname.value = "";
        this.name.value = "";
        this.patronymic.value = "";
        this.femail.checked = true;
        this.dateOfBirth.value = "";
        this.dateOfReceipt.value = "2009-09-01";
    },
    serialize: function () {
        return { student: this.serializeStudent(), presences: this.serializePresences() };
    },
    serializeStudent: function () {
        var gender;
        var id = this.title.getAttribute("data-id");
        if (id !== null)
            id = parseInt(id, 10);
        if (this.femail.checked)
            gender = "F";
        else
            gender = "M";
        var student = {
            id: id,
            gender: gender,
            surname: this.surname.value,
            name: this.name.value,
            patronymic: this.patronymic.value,
            dateOfBirth: this.dateOfBirth.value,
            dateOfReceipt: this.dateOfReceipt.value,
            group: "МТ-202"
        };
        return student;
    },
    serializePresences: function () {
        var presences = [];
        var checkboxes = document.getElementById("subjectsPanel").getElementsByTagName("input");
        for (var i = 0; i < checkboxes.length; i++) {
                presences.push({ id: parseInt(checkboxes[i].getAttribute("data-id"), 10), studying: checkboxes[i].checked });
        }
        return presences;
    },
    save: function (student) {
        if (student.surname !== "" && student.name !== "" && student.patronymic !== "") {
            this.title.innerHTML = student.surname + "&nbsp;" + student.name + "&nbsp;" + student.patronymic;
            return true;
        }
        else {
            this.showValidation(student);
            return false;
        }
    },
    showValidation: function (student) {
        if (student.patronymic === "") {
            this.validationMessagePatronymic.setAttribute("style", "visibility: visible");
            this.patronymic.setAttribute("style", "background: rgba(255, 204, 204, 0.2)");
            this.patronymic.classList.add('validationFocus');
            this.patronymic.focus();
        }
        if (student.name === "") {
            this.validationMessageName.setAttribute("style", "visibility: visible");
            this.name.setAttribute("style", "background: rgba(255, 204, 204, 0.2)");
            this.name.classList.add('validationFocus');
            this.name.focus();
        }
        if (student.surname === "") {
            this.validationMessageSurname.setAttribute("style", "visibility: visible");
            this.surname.setAttribute("style", "background: rgba(255, 204, 204, 0.2)");
            this.surname.classList.add('validationFocus');
            this.surname.focus();
        }
    },
    resetValidation: function () {
        this.hideValidation(this.validationMessagePatronymic, this.patronymic);
        this.hideValidation(this.validationMessageName, this.name);
        this.hideValidation(this.validationMessageSurname, this.surname);
    },
    hideValidation: function (message, field) {
        if (field.classList.contains('validationFocus')) {
            field.classList.remove('validationFocus');
            field.removeAttribute("style");
            message.setAttribute("style", "visibility: hidden");
        }
    },
    initalizeSubjects: function (subjects) {
        var columns = document.getElementsByClassName("subjectsColumn");
        var j = 0;
        for (var i = 0; i < subjects.length; i++) {        
            var span = document.createElement('span');
            var input = document.createElement('input');
            var label = document.createElement('label');
            label.innerHTML = subjects[i].title;
            label.setAttribute("for", "subject" + i);
            input.type = "checkbox";
            input.setAttribute("id", "subject" + subjects[i].id);
            input.setAttribute("data-id", subjects[i].id);
            span.appendChild(input);
            span.appendChild(label);
            columns[j].appendChild(span);
            j = j < 2 ? j + 1 : 0;
        }
    },
    __initEventHandlers: function () {
        var studentDetails = this;
        this.patronymic.onkeypress = function (e) {
            studentDetails.hideValidation(studentDetails.validationMessagePatronymic, studentDetails.patronymic);
        };
        this.name.onkeypress = function (e) {
            studentDetails.hideValidation(studentDetails.validationMessageName, studentDetails.name);
        };
        this.surname.onkeypress = function (e) {
            studentDetails.hideValidation(studentDetails.validationMessageSurname, studentDetails.surname);
        };
    }
});