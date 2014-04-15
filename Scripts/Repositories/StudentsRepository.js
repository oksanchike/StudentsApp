var StudentsRepository = Base.extend({
    constructor: function () {
        this.__students = TAFFY([
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
            { id: 14, gender: "F", surname: "Казанцева", name: "Татьяна", patronymic: "Леонидовна", dateOfBirth: "01.12.1993", dateOfReceipt: "01.09.2009", group: "МТ-402" },
            { id: 15, gender: "М", surname: "Калачев", name: "Максим", patronymic: "Владимирович", dateOfBirth: "26.06.1991", dateOfReceipt: "01.09.2009", group: "МТ-502" },
            { id: 16, gender: "М", surname: "Пантелеев", name: "Георгий", patronymic: "Васельевич", dateOfBirth: "22.12.1992", dateOfReceipt: "01.09.2009", group: "МТ-102" },
            { id: 17, gender: "М", surname: "Ращектаев", name: "Юрий", patronymic: "Николаевич", dateOfBirth: "13.04.1993", dateOfReceipt: "01.09.2009", group: "МТ-202" },
            { id: 18, gender: "М", surname: "Сунагатов", name: "Эдуард", patronymic: "Петрович", dateOfBirth: "31.03.1992", dateOfReceipt: "01.09.2009", group: "МТ-502" },
            { id: 19, gender: "М", surname: "Столбов", name: "Николай", patronymic: "Ильич", dateOfBirth: "25.11.1992", dateOfReceipt: "01.09.2009", group: "МТ-402" },
            { id: 20, gender: "М", surname: "Макаренко", name: "Петр", patronymic: "Максимович", dateOfBirth: "24.09.1991", dateOfReceipt: "01.09.2009", group: "МТ-102" },
            { id: 21, gender: "М", surname: "Попов", name: "Алексей", patronymic: "Федерович", dateOfBirth: "23.09.1993", dateOfReceipt: "01.09.2009", group: "МТ-102" },
            { id: 22, gender: "М", surname: "Черногорец", name: "Дмитрий", patronymic: "Николаевич", dateOfBirth: "15.04.1991", dateOfReceipt: "01.09.2009", group: "МТ-102" },
            { id: 23, gender: "М", surname: "Губайдулин", name: "Руслан", patronymic: "Петрович", dateOfBirth: "16.05.1992", dateOfReceipt: "01.09.2009", group: "МТ-102" },
            { id: 24, gender: "М", surname: "Хакимов", name: "Наиль", patronymic: "Александрович", dateOfBirth: "17.06.1993", dateOfReceipt: "01.09.2009", group: "МТ-202" },
            { id: 25, gender: "М", surname: "Козлов", name: "Константин", patronymic: "Сергеевич", dateOfBirth: "18.08.1991", dateOfReceipt: "01.09.2009", group: "МТ-202" },
            { id: 26, gender: "M", surname: "Каюмов", name: "Вадим", patronymic: "Константинович", dateOfBirth: "19.09.1991", dateOfReceipt: "01.09.2009", group: "МТ-202" },
            { id: 27, gender: "М", surname: "Павлушин", name: "Игорь", patronymic: "Дмитриевич", dateOfBirth: "20.10.1992", dateOfReceipt: "01.09.2009", group: "МТ-202" },
            { id: 28, gender: "М", surname: "Садиров", name: "Максим", patronymic: "Васильевич", dateOfBirth: "21.11.1992", dateOfReceipt: "01.09.2009", group: "МТ-302" },
            { id: 29, gender: "F", surname: "Фельгер", name: "Мария", patronymic: "Семеновна", dateOfBirth: "22.12.1993", dateOfReceipt: "01.09.2009", group: "МТ-302" },
            { id: 30, gender: "М", surname: "Хомитский", name: "Владимир", patronymic: "Владимирович", dateOfBirth: "23.01.1994", dateOfReceipt: "01.09.2009", group: "МТ-302" },
            { id: 31, gender: "М", surname: "Кордюков", name: "Артем", patronymic: "Сергеевич", dateOfBirth: "24.02.1990", dateOfReceipt: "01.09.2009", group: "МТ-302" },
            { id: 32, gender: "М", surname: "Макаренко", name: "Петр", patronymic: "Максимович", dateOfBirth: "25.03.1990", dateOfReceipt: "01.09.2009", group: "МТ-402" },
            { id: 33, gender: "F", surname: "Наборщикова", name: "Валерия", patronymic: "Владимирович", dateOfBirth: "26.06.1991", dateOfReceipt: "01.09.2009", group: "МТ-402" },
            { id: 34, gender: "М", surname: "Кукарских", name: "Кирилл", patronymic: "Пертович", dateOfBirth: "15.12.1991", dateOfReceipt: "01.09.2009", group: "МТ-402" },
            { id: 35, gender: "М", surname: "Хроленок", name: "Василий", patronymic: "Федорович", dateOfBirth: "14.11.1992", dateOfReceipt: "01.09.2009", group: "МТ-402" },
            { id: 36, gender: "М", surname: "Махмудов", name: "Мансур", patronymic: "Александрович", dateOfBirth: "21.09.1993", dateOfReceipt: "01.09.2009", group: "МТ-502" },
            { id: 37, gender: "F", surname: "Суфиярова", name: "Валерия", patronymic: "Ринатовна", dateOfBirth: "24.06.1994", dateOfReceipt: "01.09.2009", group: "МТ-502" },
            { id: 38, gender: "М", surname: "Сек", name: "Эдуард", patronymic: "Разифович", dateOfBirth: "24.09.1991", dateOfReceipt: "01.09.2009", group: "МТ-502" },
            { id: 39, gender: "М", surname: "Постика", name: "Денис", patronymic: "Раульевич", dateOfBirth: "28.05.1991", dateOfReceipt: "01.09.2009", group: "МТ-602" },
            { id: 40, gender: "М", surname: "Хакимов", name: "Александр", patronymic: "Ильфатович", dateOfBirth: "01.09.1991", dateOfReceipt: "01.09.2009", group: "МТ-602" },
            { id: 41, gender: "М", surname: "Рычков", name: "Алек", patronymic: "Артурович", dateOfBirth: "07.01.1992", dateOfReceipt: "01.09.2009", group: "МТ-602" }
        ]);
        this.lastId = this.__students().get().length;
    },
    save: function (student) {
        if (student.id !== null) {
            this.__students({ id: student.id }).update(student);
        }
        else {
            student.id = this.lastId + 1;
            this.__students.insert(student);
            this.lastId++;
        }
    },
    deleteStudentById: function (id) {
        this.__students({ id: id }).remove();
    },
    getGroups: function () {
        var groups = [];
        var students = this.__students().get();
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
            var student = this.__students({ id: id }).first();
            return student ? student : null;
        }
        else
            return null;
    },
    getAll: function () {
        return Helpers.deepCopy(this.__students().order("surname asec").get());
    },
    getByGroup: function (group) {
        return Helpers.deepCopy(this.__students({ group: group }).order("surname asec").get());
    }
});