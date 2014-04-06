var StudentsPresenceRepository = Base.extend({
    constructor: function () {
        this.studentsPresence = TAFFY([
            { id: 1, studentId: 1, subjectId: 1, totalAbsenseTime: 5, withValidReasonTime: 2, studying: true },
            { id: 2, studentId: 1, subjectId: 2, totalAbsenseTime: 6, withValidReasonTime: 6, studying: true },
            { id: 3, studentId: 1, subjectId: 3, totalAbsenseTime: 0, withValidReasonTime: 0, studying: true },
            { id: 4, studentId: 1, subjectId: 5, totalAbsenseTime: 2, withValidReasonTime: 0, studying: false },
            { id: 5, studentId: 2, subjectId: 1, totalAbsenseTime: 5, withValidReasonTime: 2, studying: true },
            { id: 6, studentId: 4, subjectId: 2, totalAbsenseTime: 6, withValidReasonTime: 6, studying: true },
            { id: 7, studentId: 3, subjectId: 3, totalAbsenseTime: 6, withValidReasonTime: 2, studying: true },
            { id: 8, studentId: 3, subjectId: 2, totalAbsenseTime: 6, withValidReasonTime: 2, studying: true },
            { id: 9, studentId: 3, subjectId: 5, totalAbsenseTime: 2, withValidReasonTime: 0, studying: false }
        ]);
    },
    save: function () {

    },
    deleteStudentsPresence: function () {

    },
    getByStudentId: function (id) {
        return this.studentsPresence({ studentId: id}).get();
    },
    getAll: function () {
        return this.studentsPresence().get();
    }
});