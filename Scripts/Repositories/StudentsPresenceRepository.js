var StudentsPresenceRepository = Base.extend({
    constructor: function () {
        this.lastId = 9;
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
    save: function (subjectInfo, studentId) {
        var studentPresence = this.studentsPresence({ studentId: studentId }).get();
        for (var i = 0; i < subjectInfo.length; i++) {
            var found = false;
            for (var j = 0; j < studentPresence.length; j++) {
                if (studentPresence[j].subjectId == subjectInfo[i].id) {
                    found = true;
                    break;
                }
            }
            if (found)
                this.studentsPresence({ subjectId: subjectInfo[i].id, studentId: studentId }).update({ studying: subjectInfo[i].studying });
            else if (subjectInfo[i].studying) {
                this.studentsPresence.insert({
                    id: this.lastId + 1,
                    studentId: studentId,
                    subjectId: subjectInfo[i].id,
                    totalAbsenseTime: 0,
                    withValidReasonTime: 0,
                    studying: true
                });
                this.lastId++;
            }
        }
    },
    deleteStudentsPresence: function () {

    },
    getByStudentId: function (id) {
        return this.studentsPresence({ studentId: id }).get();
    },
    getAll: function () {
        return this.studentsPresence().get();
    }
});