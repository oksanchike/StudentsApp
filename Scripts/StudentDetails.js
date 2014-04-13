var StudentDetails = Base.extend({
    constructor: function () {
        this.chart = new Chart(document.getElementById("Chart"));
        this.title = document.getElementById("Title");
        this.surnameInput = document.getElementById("SurnameStudent");
        this.nameInput = document.getElementById("NameStudent");
        this.patronymicInput = document.getElementById("PatronymicStudent");
        this.femailRadioButton = document.getElementById("Female");
        this.maleRadioButton = document.getElementById("Male");
        this.dateOfBirthInput = document.getElementById("DateOfBirth");
        this.dateOfReceiptInput = document.getElementById("DateOfReceipt");
        this.validationMessagePatronymic = document.getElementById("ValidationMessagePatronymic");
        this.validationMessageName = document.getElementById("ValidationMessageName");
        this.validationMessageSurname = document.getElementById("ValidationMessageSurname");
        this.validationMessageDateOfBirth = document.getElementById("ValidationMessageDateOfBirth");
        this.validationMessageDateOfReceipt = document.getElementById("ValidationMessageDateOfReceipt");
        this.genderPanel = document.getElementById("Gender");
        this.groupPanel = document.getElementById("HeadingGroup");
        this.createDatepickers();
    },
    createDatepickers: function () {
        $("#DateOfBirth").datepicker({
            changeMonth: true,
            changeYear: true,
            showOn: "button",
            dateFormat: "dd.mm.yy"
        });
        $("#DateOfReceipt").datepicker({
            changeMonth: true,
            changeYear: true,
            showOn: "button",
            dateFormat: "dd.mm.yy"
        });
        var buttons = document.getElementsByClassName("ui-datepicker-trigger");
        buttons[0].innerHTML = "";
        buttons[1].innerHTML = "";
        var div = document.createElement("div");
        var div1 = document.createElement("div1");
        div.classList.add("icon");
        div1.classList.add("icon");
        buttons[0].appendChild(div);
        buttons[1].appendChild(div1);
    },
    setStudent: function (student, studentPresences, subjects) {
        this.studentPresences = studentPresences;
        this.studentSubjects = subjects;
        this.title.innerHTML = student.surname + "&nbsp;" + student.name + "&nbsp;" + student.patronymic;
        this.surnameInput.value = student.surname;
        this.nameInput.value = student.name;
        this.patronymicInput.value = student.patronymic;
        if (student.gender === "F") {
            this.genderPanel.innerHTML = "Женский";
            this.femailRadioButton.checked = true;
        }
        else {
            this.genderPanel.innerHTML = "Мужской";
            this.femailRadioButton.checked = false;
            this.maleRadioButton.checked = true;
        }
        this.dateOfBirthInput.value = student.dateOfBirth;
        this.dateOfReceiptInput.value = student.dateOfReceipt;
        this.title.setAttribute("data-id", student.id);
        this.__initEventHandlers();
        this.setSubjects(this.studentPresences);
        this.drawChartForStudent(this.studentPresences, this.studentSubjects);
    },
    setSubjects: function (studentPresences) {
        var checkboxes = document.getElementById("subjectsPanel").getElementsByTagName("input");
        for (var i = 0; i < checkboxes.length; i++)
            checkboxes[i].checked = false;
        for (var i = 0; i < studentPresences.length; i++) {
            var self = this;
            var checkbox = document.getElementById("subject" + studentPresences[i].subjectId);
            checkbox.checked = studentPresences[i].studying;
        }
    },
    changeData: function (subjectId, checked) {
        if (checked) {
            for (var i = 0; i < this.subjects.length; i++)
                if (this.subjects[i].id === subjectId) {
                    this.studentSubjects.push(this.subjects[i]);
                    break;
                }
        }
        else {
            for (var i = 0; i < this.studentSubjects.length; i++)
                if (this.studentSubjects[i].id === subjectId) {
                    this.studentSubjects.splice(i, 1);
                    break;
                }
        }
        var found = false;
        for (var i = 0; i < this.studentPresences.length; i++) {
            if (this.studentPresences[i].subjectId === subjectId) {
                this.studentPresences[i].studying = checked;
                found = true;
                break;
            }
        }
        if (!found) {
            var newStudentPresences = {
                studentId: this.getCurrentStudentId(),
                subjectId: subjectId,
                totalAbsenseTime: 0,
                withValidReasonTime: 0,
                studying: true
            };
            this.studentPresences.push(newStudentPresences);
        }
    },
    drawChartForStudent: function (studentPresences, studentSubjects) {
        this.chart.drawForStudent(studentPresences, studentSubjects);
    },
    resetStudent: function () {
        this.title.innerHTML = "Новый студент";
        this.title.removeAttribute("data-id");
        this.surnameInput.value = "";
        this.nameInput.value = "";
        this.genderPanel.innerHTML = "Женский";
        this.patronymicInput.value = "";
        this.femailRadioButton.checked = true;
        this.dateOfBirthInput.value = "";
        this.dateOfReceiptInput.value = "01.09.2009";
    },
    serialize: function () {
        return { student: this.serializeStudent(), presences: this.serializePresences() };
    },
    getCurrentStudentId: function () {
        var id = this.title.getAttribute("data-id");
        if (id !== null)
            id = parseInt(id, 10);
        return id;
    },
    serializeStudent: function () {
        var gender;
        if (this.femailRadioButton.checked)
            gender = "F";
        else
            gender = "M";
        var student = {
            id: this.getCurrentStudentId(),
            gender: gender,
            surname: this.surnameInput.value,
            name: this.nameInput.value,
            patronymic: this.patronymicInput.value,
            dateOfBirth: this.dateOfBirthInput.value,
            dateOfReceipt: this.dateOfReceiptInput.value,
            group: this.groupPanel.innerHTML
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
    validate: function (student) {
        var regexpName = /^[а-яА-ЯёЁ][а-яА-ЯёЁ_\.]{1,20}$/;
        var regexpDate = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
        if (regexpName.test(student.surname) && regexpName.test(student.name) && regexpName.test(student.patronymic) && regexpDate.test(student.dateOfBirth) && regexpDate.test(student.dateOfReceipt)) {
            this.title.innerHTML = student.surname + "&nbsp;" + student.name + "&nbsp;" + student.patronymic;
            this.resetValidation();
            return true;
        }
        else {
            this.resetValidation();
            this.showValidation(student, regexpName, regexpDate);
            return false;
        }
    },
    showValidation: function (student, regexpName, regexpDate) {
        if (regexpDate.test(student.dateOfReceipt) !== true) {
            if (student.dateOfReceipt === "") {
                this.validationMessageDateOfReceipt.innerHTML = "Поле обязательно к заполнению";
            }
            else {
                this.validationMessageDateOfReceipt.innerHTML = "Введены недопустимые символы";
            }
            this.validationMessageDateOfReceipt.setAttribute("style", "visibility: visible");
            this.dateOfReceiptInput.setAttribute("style", "background: rgba(255, 204, 204, 0.2)");
            this.dateOfReceiptInput.classList.add("validationFocus");
            this.dateOfReceiptInput.focus();
        }
        if (regexpDate.test(student.dateOfBirth) !== true) {
            if (student.dateOfBirth === "") {
                this.validationMessageDateOfBirth.innerHTML = "Поле обязательно к заполнению";
            }
            else {
                this.validationMessageDateOfBirth.innerHTML = "Введены недопустимые символы";
            }
            this.validationMessageDateOfBirth.setAttribute("style", "visibility: visible");
            this.dateOfBirthInput.setAttribute("style", "background: rgba(255, 204, 204, 0.2)");
            this.dateOfBirthInput.classList.add("validationFocus");
            this.dateOfBirthInput.focus();
        }
        if (regexpName.test(student.patronymic) !== true) {
            if (student.patronymic === "") {
                this.validationMessagePatronymic.innerHTML = "Поле обязательно к заполнению";
            }
            else {
                this.validationMessagePatronymic.innerHTML = "Введены недопустимые символы";
            }
            this.validationMessagePatronymic.setAttribute("style", "visibility: visible");
            this.patronymicInput.setAttribute("style", "background: rgba(255, 204, 204, 0.2)");
            this.patronymicInput.classList.add("validationFocus");
            this.patronymicInput.focus();
        }
        if (regexpName.test(student.name) !== true) {
            if (student.name === "") {
                this.validationMessageName.innerHTML = "Поле обязательно к заполнению";
            }
            else {
                this.validationMessageName.innerHTML = "Введены недопустимые символы";
            }
            this.validationMessageName.setAttribute("style", "visibility: visible");
            this.nameInput.setAttribute("style", "background: rgba(255, 204, 204, 0.2)");
            this.nameInput.classList.add("validationFocus");
            this.nameInput.focus();
        }
        if (regexpName.test(student.surname) !== true) {
            if (student.surname === "") {
                this.validationMessageSurname.innerHTML = "Поле обязательно к заполнению";
            }
            else {
                this.validationMessageSurname.innerHTML = "Введены недопустимые символы";
            }
            this.validationMessageSurname.setAttribute("style", "visibility: visible");
            this.surnameInput.setAttribute("style", "background: rgba(255, 204, 204, 0.2)");
            this.surnameInput.classList.add("validationFocus");
            this.surnameInput.focus();
        }
    },
    resetValidation: function () {
        this.hideValidation(this.validationMessagePatronymic, this.patronymicInput);
        this.hideValidation(this.validationMessageName, this.nameInput);
        this.hideValidation(this.validationMessageSurname, this.surnameInput);
        this.hideValidation(this.validationMessageDateOfBirth, this.dateOfBirthInput);
        this.hideValidation(this.validationMessageDateOfReceipt, this.dateOfReceiptInput);
    },
    hideValidation: function (message, field) {
        if (field.classList.contains("validationFocus")) {
            field.classList.remove("validationFocus");
            field.removeAttribute("style");
            message.setAttribute("style", "visibility: hidden");
        }
    },
    initalizeSubjects: function (subjects) {
        this.subjects = subjects;
        var columns = document.getElementsByClassName("subjectsColumn");
        var j = 0;
        for (var i = 0; i < subjects.length; i++) {
            var id = subjects[i].id;
            var span = document.createElement("span");
            var input = document.createElement("input");
            var label = document.createElement("label");
            label.innerHTML = subjects[i].title;
            label.setAttribute("for", "subject" + (i + 1));
            input.type = "checkbox";
            input.setAttribute("id", "subject" + id);
            input.setAttribute("data-id", id);
            span.appendChild(input);
            span.appendChild(label);
            columns[j].appendChild(span);
            input.onchange = function (subjectId, self) {
                return function () {
                    self.changeData(subjectId, this.checked);
                    self.drawChartForStudent(self.studentPresences, self.studentSubjects);
                };
            }(id, this);
            j = j < 2 ? j + 1 : 0;
        }
    },
    __initEventHandlers: function () {
        var self = this;
        this.patronymicInput.oninput = function () {
            self.hideValidation(self.validationMessagePatronymic, self.patronymicInput);
        };
        this.nameInput.oninput = function () {
            self.hideValidation(self.validationMessageName, self.nameInput);
        };
        this.surnameInput.oninput = function () {
            self.hideValidation(self.validationMessageSurname, self.surnameInput);
        };
        $(this.dateOfBirthInput).change(function () {
            self.hideValidation(self.validationMessageDateOfBirth, self.dateOfBirthInput);
        });
        this.dateOfBirthInput.oninput = function () {
            self.hideValidation(self.validationMessageDateOfBirth, self.dateOfBirthInput);
        };
        $(this.dateOfReceiptInput).change(function () {
            self.hideValidation(self.validationMessageDateOfReceipt, self.dateOfReceiptInput);
        });
        this.dateOfReceiptInput.oninput = function () {
            self.hideValidation(self.validationMessageDateOfReceipt, self.dateOfReceiptInput);
        };
        document.getElementById("TotalStatistics").onclick = function () {
            self.chart.drawSubjectText();
            self.chart.drawTotalDoughnutChart();
        };
    }
});