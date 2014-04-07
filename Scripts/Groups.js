var Groups = Base.extend({
    constructor: function (students) {
        this.students = students;
        this.active = false;
    },
    addGroups: function () {
        this.active = !this.active;
        var students = this.students;
        var div = document.getElementById('ButtonGroups');
        var div2 = document.getElementById('Groups');
        if (this.active) {
            var div1 = document.createElement('div');
            var li = document.createElement('li');
            var ul = document.createElement('ul');
            div1.appendChild(ul);
            div1.classList.add('groupList');
            div2.classList.add('groupsList-active');
            div.appendChild(div1);
            for (var i = 0; i < students.length; i++) {
                var li = document.createElement('li');
                li.innerHTML = students[i].group;
                li.classList.add('styleLi');
                //var self = this;
                //li.addEventListener('click', function (sender) {
                // self.setActive(sender.currentTarget);
                // sender.stopPropagation();
                //});
                ul.insertBefore(li, ul.firstChild);
            }
        }
        else {
            div.removeChild(div.childNodes[3]);
            div2.classList.remove('groupsList-active');
        }
    }
})