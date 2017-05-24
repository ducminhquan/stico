var apiURL = './data/songs.json'

Vue.use(VueMaterial);

var normalizeVietnamese = function (text) {
    return text.normalize('NFD').toLowerCase()
        .replace(/[\u0300-\u036f]/g, "")
        .replace('đ', 'd');
}

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        songs: null,
        filterTitle: ''
    },
    created: function () {
        this.fetchData()
    },
    methods: {
        fetchData: function () {
            var xhr = new XMLHttpRequest()
            var self = this
            xhr.open('GET', apiURL)
            xhr.onload = function () {
                self.songs = JSON.parse(xhr.responseText)
            }
            xhr.send()
        }
    },
    filters: {
        truncate: function (text, stop, clamp) {
            stop = stop || 50;
            return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
        }
    },
    computed: {
        filteredByTitle: function () {

            var filterTitle = normalizeVietnamese(this.filterTitle);
            console.log(filterTitle)
            var songs = this.songs;
            if (filterTitle) {
                songs = songs.filter(function (song) {
                    return Object.keys(song).some(function (key) {
                        return String(normalizeVietnamese(song[key])).indexOf(filterTitle) > -1
                    })
                })
            }

            return songs;
        }
    }
});

