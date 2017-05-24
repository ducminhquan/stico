var apiURL = './data/songs.json';

Vue.use(VueMaterial);

Vue.material.registerTheme('default', {
    primary: 'teal',
    accent: 'pink',
    warn: 'deep-orange',
    background: 'white'
});

var normalizeVietnamese = function (text) {
    return text.normalize('NFD').toLowerCase()
        .replace(/[\u0300-\u036f]/g, "")
        .replace('đ', 'd');
};

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        songs: null,
        filterTitle: '',
        selected: {}
    },
    created: function () {
        this.fetchData();
    },
    methods: {
        toggleLeftSidenav: function () {
            this.$refs.leftSidenav.toggle();
        },
        closeLeftSidenav: function () {
            this.$refs.leftSidenav.close();
        },
        openLeftSidenav: function () {
            this.$refs.leftSidenav.open();
        },
        openHelpDialog: function () {
            this.$refs.helpDialog.open();
        },
        fetchData: function () {
            var xhr = new XMLHttpRequest();
            var self = this;
            xhr.open('GET', apiURL);
            xhr.onload = function () {
                self.songs = JSON.parse(xhr.responseText);
                self.selected = self.songs[0];
            };
            xhr.send();
        },
        toHtml: function (text) {
            text = text || '';
            return text.replace(/(?:\r\n|\r|\n)/g, '<br />');
        },
        selectSong: function (song) {
            this.selected = song;
            this.closeLeftSidenav();
        }
    },
    filters: {
        truncate: function (text, stop, clamp) {
            text = text || '';
            stop = stop || 50;
            return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '');
        },
        toHtml: function (text) {
            text = text || '';
            return text.replace(/(?:\r\n|\r|\n)/g, '<br />');
        }
    },
    computed: {
        filteredByTitle: function () {
            var filterTitle = normalizeVietnamese(this.filterTitle);
            var songs = this.songs;
            if (filterTitle) {
                songs = songs.filter(function (song) {
                    return Object.keys(song).some(function (key) {
                        return String(normalizeVietnamese(song[key])).indexOf(filterTitle) > -1;
                    });
                });
            }

            return songs;
        }
    }
});

