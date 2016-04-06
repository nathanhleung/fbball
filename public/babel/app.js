/* global $ Vue */
"use strict";

new Vue({
  el: '#app',
  data: {
    loaded: false,
    players: [],
    timer: 10,
    teamScores: [],
    teams: ['raptors', 'warriors']
  },
  methods: {
    getData() {
      this.loaded = false;
      this.timer = 10;
      const timerInterval = setInterval(() => {
        if (this.timer < 2) {
          this.timer -= this.timer / 2;
        } else {
          this.timer--;
        }
      }, 1000);
      // /data-test.json is a good test data kit
      $.get('/data.json', (data) => {
        clearInterval(timerInterval);
        const ordered = data.sort((a, b) => {
          // in order of ascending score
          return b.score - a.score;
        });
        this.players = ordered;
        this.getTeamScores();
        this.loaded = true;
        // Don't calculate height until after table is rendered
        setTimeout(() => {
          // So later refreshes don't look bad (scrollbar disappearing)
          const $body = $('body');
          $body.css('min-height', $body.height());
        }, 0);
      });
    },
    getTeamScore(team) {
      const score = this.players.reduce((prev, curr) => {
        if (curr.team === team) {
          return prev + curr.score;
        } else {
          return prev;
        }
      }, 0);
      return score;
    },
    getTeamScores() {
      this.teamScores = [this.getTeamScore(0), this.getTeamScore(1)];
    }
  },
  ready() {
    this.getData();
  }
})

Vue.filter('twoDecimals', (value) => {
  return Math.round(value * 100) / 100;
});

Vue.filter('capitalize', (value) => {
  return value.substr(0,1).toUpperCase() + value.substr(1);
});