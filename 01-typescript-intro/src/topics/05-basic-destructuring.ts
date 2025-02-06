interface AudioPlayer {
    audioVolume: number;
    songDuration: number;
    song: string;
    details: Details;
}

interface Details {
    author: string;
    year: number;
}

const audioPlayer : AudioPlayer = {
    audioVolume: 90,
    songDuration: 36,
    song: "Mess",
    details: {
        author: 'Ed Sheeran',
        year: 2015
    }
}

const song : string = 'New Song';

const { song: anotherSong, songDuration: duration, details } : AudioPlayer = audioPlayer;
const { author } = details;

console.log('Song', anotherSong);
console.log('Duration', duration);
console.log('Author', author);

const dbz : string[] = ['Goku', 'Vegeta', 'Trunks'];

const [ , , trunks, other = 'Not Found'] : string[] = dbz;

console.log(trunks);
console.log(other);
