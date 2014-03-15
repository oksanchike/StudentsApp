var StudentsList = Base.extend({
    constructor: function (list) {
        this.list = list;
    },
    setActive: function (item) {
        if (this.active)
            this.active.classList.remove('studentsList-active');
        this.active = item;
        this.active.classList.add('studentsList-active');
    },
    addStudent: function (student) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        var span = document.createElement('span');
        if (student)
            a.innerHTML = student.surname + "&nbsp;" + student.name + "&nbsp;" + student.patronymic;
        else
            a.innerHTML = 'Новый студент';
        a.href = '#';
        //span.setAttribute("data-id", student.id);
        li.appendChild(a);
        span.appendChild(li);
        var self = this;
        span.addEventListener('click', function (sender) {
            self.setActive(sender.currentTarget);
        });
        this.list.insertBefore(span, this.list.firstChild);
        this.setActive(span);
    },
    saveСhanges: function () {
        this.active.firstChild.firstChild.innerHTML = SurnameStudent.value + '&nbsp;' + NameStudent.value + '&nbsp;' + PatronymicStudent.value;
        this.__findPlaceForNew();
    },
    deleteStudent: function () {
        this.list.removeChild(this.active);
        this.setActive(this.list.firstChild);
    },
    __findPlaceForNew: function () {
        var begin = 1;
        var end = this.list.childElementCount - 1;
        if (this.active.firstChild.firstChild.innerHTML < this.list.children[begin].firstChild.firstChild.innerHTML) {
            return;
        }
        else if (this.active.firstChild.firstChild.innerHTML > this.list.children[end].firstChild.firstChild.innerHTML) {
            this.list.appendChild(this.active);
        }
        else {
            while (end - begin != 1) {
                var middle = Math.floor(end - (end - begin) / 2);
                if (this.list.children[middle].firstChild.firstChild.innerHTML > this.active.firstChild.firstChild.innerHTML) {
                    end = middle;
                }
                else if (this.list.children[middle].firstChild.firstChild.innerHTML < this.active.firstChild.firstChild.innerHTML) {
                    begin = middle;
                }
                else {
                    end = middle;
                    break;
                }
            }
            this.list.insertBefore(this.active, this.list.children[end]);
        }
    }
});