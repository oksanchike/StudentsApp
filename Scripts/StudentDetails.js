var StudentDetails = Base.extend({
    setStudent: function (student) {
        this.title = document.getElementById('Title-student');
        this.title.innerHTML = student.surname + "&nbsp;" + student.name + "&nbsp;" + student.patronymic;
        this.surname = document.getElementById('SurnameStudent');
        this.surname.value = student.surname;
        this.name = document.getElementById('NameStudent');
        this.name.value = student.name;
        this.patronymic = document.getElementById('PatronymicStudent');
        this.patronymic.value = student.patronymic;
        this.gender = document.getElementById('Female');
        if (student.gender == 'F')
            this.gender.checked = true;
        else {
            this.gender.checked = false;
            this.gender = document.getElementById('Male');
            this.gender.checked = true;
        }
        this.dateOfBirth = document.getElementById('DateOfBirth');
        this.dateOfBirth.value = student.dateOfBirth;
        this.dateOfReceipt = document.getElementById('DateOfReceipt');
        this.dateOfReceipt.value = student.dateOfReceipt;
        this.title.setAttribute("data-id", student.id);
    },
    resetStudent: function () {
        this.title = document.getElementById('Title-student');
        this.title.innerHTML = "";
        this.title.removeAttribute("data-id");
        this.surname = document.getElementById('SurnameStudent');
        this.surname.value = "";
        this.name = document.getElementById('NameStudent');
        this.name.value = "";
        this.patronymic = document.getElementById('PatronymicStudent');
        this.patronymic.value = "";
        this.gender = document.getElementById('Female');
        this.gender.checked = true;
        this.dateOfBirth = document.getElementById('DateOfBirth');
        this.dateOfBirth.value = "";
        this.dateOfReceipt = document.getElementById('DateOfReceipt');
        this.dateOfReceipt.value = "";
    },
    serialize: function () {
        this.gender = document.getElementById('Female');
        var gender;
        var id = this.title.getAttribute("data-id");
        if (id !== null)
            id = parseInt(id);
        if (this.gender.checked)
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
    }
});