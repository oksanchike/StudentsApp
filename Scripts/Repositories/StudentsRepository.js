var StudentsRepository = Base.extend({
    constructor: function () {
        this.students = TAFFY([
            { id: 1, gender: "M", surname: "Мостовой", name: "Вячеслав", patronymic: "Игоревич", dateOfBirth: "07.10.1992", dateOfReceipt: "01.09.2009", group: "МТ-102" },
            { id: 2, gender: "F", surname: "Запорожец", name: "Оксана", patronymic: "Викторовна", dateOfBirth: "29.11.1991", dateOfReceipt: "01.09.2009", group: "МТ-102" },
            { id: 3, gender: "F", surname: "Глухова", name: "Анастасия", patronymic: "Андреевна", dateOfBirth: "03.01.1992", dateOfReceipt: "01.09.2009", group: "МТ-102" },
            { id: 4, gender: "F", surname: "Хабибулина", name: "Татьяна", patronymic: "Васильевна", dateOfBirth: "01.11.1989", dateOfReceipt: "01.09.2009", group: "МТ-102" },
            { id: 5, gender: "М", surname: "Баранов", name: "Валентин", patronymic: "Владимирович", dateOfBirth: "22.04.1990", dateOfReceipt: "01.09.2009", group: "МТ-502" },
            { id: 6, gender: "M", surname: "Бондаренко", name: "Роман", patronymic: "Игоревич", dateOfBirth: "07.10.1992", dateOfReceipt: "01.09.2009", group: "МТ-502" },
            { id: 7, gender: "M", surname: "Брагин", name: "Владислав", patronymic: "Викторовна", dateOfBirth: "25.05.1993", dateOfReceipt: "01.09.2009", group: "МТ-502" },
            { id: 8, gender: "F", surname: "Лодочникова", name: "Алена", patronymic: "Александровна", dateOfBirth: "16.08.1993", dateOfReceipt: "01.09.2009", group: "МТ-502" },
            { id: 9, gender: "F", surname: "Наборщикова", name: "Елена", patronymic: "Васильевна", dateOfBirth: "13.12.1992", dateOfReceipt: "01.09.2009", group: "МТ-402" },
            { id: 10, gender: "М", surname: "Бухов", name: "Владимир", patronymic: "Александрович", dateOfBirth: "22.11.1992", dateOfReceipt: "01.09.2009", group: "МТ-502" },
            { id: 11, gender: "M", surname: "Веселков", name: "Александр", patronymic: "Игоревич", dateOfBirth: "12.12.1993", dateOfReceipt: "01.09.2009", group: "МТ-602" },
            { id: 12, gender: "F", surname: "Болотникова", name: "Марина", patronymic: "Сергеевна", dateOfBirth: "25.02.1991", dateOfReceipt: "01.09.2009", group: "МТ-202" },
            { id: 13, gender: "F", surname: "Казанцева", name: "Кристина", patronymic: "Андреевна", dateOfBirth: "05.07.1992", dateOfReceipt: "01.09.2009", group: "МТ-302" },
            { id: 14, gender: "F", surname: "Казанцева", name: "Татьяна", patronymic: "Андреевна", dateOfBirth: "01.12.1993", dateOfReceipt: "01.09.2009", group: "МТ-402" },
            { id: 15, gender: "М", surname: "Калачев", name: "Максим", patronymic: "Владимирович", dateOfBirth: "26.06.1991", dateOfReceipt: "01.09.2009", group: "МТ-502" },
            { id: 16, gender: "М", surname: "Пантелеев", name: "Георгий", patronymic: "Васельевич", dateOfBirth: "22.12.1992", dateOfReceipt: "01.09.2009", group: "МТ-102" },
            { id: 17, gender: "М", surname: "Ращектаев", name: "Юрий", patronymic: "Николаевич", dateOfBirth: "13.04.1993", dateOfReceipt: "01.09.2009", group: "МТ-202" },
            { id: 18, gender: "М", surname: "Сунагатов", name: "Эдуард", patronymic: "Петрович", dateOfBirth: "31.03.1992", dateOfReceipt: "01.09.2009", group: "МТ-502" },
            { id: 19, gender: "М", surname: "Столбов", name: "Николай", patronymic: "Ильич", dateOfBirth: "25.11.1992", dateOfReceipt: "01.09.2009", group: "МТ-402" },
            { id: 20, gender: "М", surname: "Макаренко", name: "Петр", patronymic: "Максимович", dateOfBirth: "24.09.1991", dateOfReceipt: "01.09.2009", group: "МТ-502" }
        ]);
        this.lastId = this.students().get().length;
    },
    save: function (student) {
        if (student.id !== null) {
            this.students({ id: student.id }).update(student);
        }
        else {
            student.id = this.lastId + 1;
            this.students.insert(student);
            this.lastId++;
        }
    },
    deleteStudentById: function (id) {
        this.students({ id: id }).remove();
    },
    getGroups: function () {
        var groups = [];
        var students = this.students().get();
        for (var i = 0; i < students.length; i++) {
            var group = students[i].group;
            var found = false;
            for (var j = 0; j < groups.length; j++) {
                if (group == groups[j]) {
                    found = true;
                    break;
                }
            }
            if (!found)
                groups.push(group);
        }
        function sortFunction(a, b){
            if (a < b)
                return -1;
            if (a > b)
                return 1;
            return 0;
        }
        return groups.sort(sortFunction);
    },
    getById: function (id) {
        if (id !== null) {
            var student = this.students({ id: id }).first();
            return student ? student : null;
        }
        else
            return null;
    },
    getAll: function () {
        return this.students().order("surname asec").get().slice(0);
    },
    getByGroup: function (group) {
        return this.students({ group: group }).order("surname asec").get().slice(0);
    }
});