const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('./index'); 

chai.use(chaiHttp);
const { expect } = chai;

describe('Movie Lobby API', () => {
    before(async function() {
        // Connect only if there's no active connection
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect('mongodb://127.0.0.1:27017/myapp', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        }
    });

    after(async function() {
        // Ensure to disconnect after all tests
        await mongoose.disconnect();
    });

    describe('GET /movies', () => {
        it('should list all movies', (done) => {
            chai.request(app)
                .get('/movies')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    describe('GET /search', () => {
        it('should search for a movie by title', (done) => {
            chai.request(app)
                .get('/search?q=Inception')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    describe('POST /movies', () => {
        it('should add a new movie (admin role required)', (done) => {
            const newMovie = {
                title: 'Inception',
                genre: 'Sci-Fi',
                rating: 8.8,
                streamingLink: 'http://link.to/inception',
            };
    
            chai.request(app)
                .post('/movies')
                .set('role', 'admin')
                .send(newMovie)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.include(newMovie);
                    done();
                });
        });
    });

    describe('PUT /movies/:id', () => {
        let movieId;
    
        before(async () => {
            const newMovie = await chai.request(app)
                .post('/movies')
                .set('role', 'admin')
                .send({
                    title: 'Inception',
                    genre: 'Sci-Fi',
                    rating: 8.8,
                    streamingLink: 'http://link.to/inception',
                });
            movieId = newMovie.body._id;
        });
    
        it('should update an existing movie (admin role required)', (done) => {
            const updatedMovie = {
                title: 'Inception - Updated',
                genre: 'Sci-Fi',
                rating: 9.0,
                streamingLink: 'http://link.to/inception-updated',
            };
    
            chai.request(app)
                .put(`/movies/${movieId}`)
                .set('role', 'admin')
                .send(updatedMovie)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.title).to.equal(updatedMovie.title);
                    done();
                });
        });
    });
    
    describe('DELETE /movies/:id', () => {
        let movieId;
    
        before(async () => {
            const newMovie = await chai.request(app)
                .post('/movies')
                .set('role', 'admin')
                .send({
                    title: 'Inception',
                    genre: 'Sci-Fi',
                    rating: 8.8,
                    streamingLink: 'http://link.to/inception',
                });
            movieId = newMovie.body._id;
        });
    
        it('should delete a movie (admin role required)', (done) => {
            chai.request(app)
                .delete(`/movies/${movieId}`)
                .set('role', 'admin')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
    
    
});