var Groups = Base.extend({
    constructor: function (groups) {
        this.active = false;
        this.div2 = document.getElementById('Groups');
        this.div = document.getElementById('ButtonGroups');
        this.addGroups(groups);
        this.activeGroup = groups[0];
        document.getElementById("HeadinGgroup").innerText = this.activeGroup;
    },
    addGroups: function (groups) {
        this.div1 = document.createElement('div');
        var li = document.createElement('li');
        var ul = document.createElement('ul');
        this.div1.appendChild(ul);
        this.div1.classList.add('groupList');
        for (var i = 0; i < groups.length; i++) {
            var li = document.createElement('li');
            li.innerHTML = groups[i];
            li.classList.add('styleLi');
            var self = this;
            li.addEventListener('click', function (sender) {
                self.activeGroup = sender.currentTarget.innerText;
                document.getElementById("HeadinGgroup").innerText = self.activeGroup;
                self.groupChanged = new CustomEvent('groupChanged', { detail: { group: self.activeGroup } });
                self.div1.dispatchEvent(self.groupChanged);
            });
            ul.appendChild(li, ul.firstChild);
        }
    },
    clickGroups: function () {
        if (!this.active)
            this.open();
        else
            this.close();
    },
    open: function () {
        this.active = !this.active;
        this.div.appendChild(this.div1);
        this.div2.classList.add('groupsList-active');
    },
    close: function () {
        if (this.active) {
            this.active = !this.active;
            this.div.removeChild(this.div.childNodes[3]);
            this.div2.classList.remove('groupsList-active');
        }
    }
})