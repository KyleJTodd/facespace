import UserService from '../services/UserService';
import express from 'express'
import PhotoService from '../services/PhotoService';


let _service = new UserService()
let _repo = _service.repository

let _photoRepo = new PhotoService().repository

export default class UserController {
    constructor() {
        this.router = express.Router()
            .get('', this.getAllUsers)
            .get('/:id', this.getUserById)
            .get('/:id/photos', this.getPhotos)
            .get('/:id/friends', this.getFriends)
            .put('/:id', this.editUser)
            .post('', this.createUser)
            .post('/:id/friends', this.addFriend)
            .delete('/:id', this.deleteUser)
            .delete('/:id/friends/:friendId', this.deleteFriend)
            .use('*', this.defaultRoute)
    }

    //GET STUFF
    async getAllUsers(req, res, next) {
        try {
            let users = await _repo.find({})
            return res.send(users)
        } catch (error) { next(error) }
    }
    async getUserById(req, res, next) {
        try {
            let user = await _repo.findById(req.params.id)
            return res.send(user)
        } catch (error) { next(error) }
    }
    async getPhotos(req, res, next) {
        try {
            let photos = await _photoRepo.find({ authorId: req.params.id })
            return res.send(photos)
        } catch (error) { next(error) }

    }
    async getFriends(req, res, next) {
        try {
            let user = await _repo.findById(req.params.id).populate('friends')
            return res.send(user)
        } catch (error) { next(error) }
    }








    async editUser(req, res, next) {

    }
    async createUser(req, res, next) {
        try {
            let user = await _repo.create(req.body)
            return res.status(201).send(user)
        } catch (error) { next(error) }
    }
    async addFriend(req, res, next) {
        try {
            let user = await _repo.findById(req.params.id)
            let friendId = req.body.friendId
            user.friends.push(friendId)
            user.save(err => {
                if (err) {
                    return next(err)
                }
                return res.send(user)
            })
        } catch (error) { next(error) }
    }
    async deleteUser(req, res, next) {

    }
    async deleteFriend(req, res, next) {

    }
    defaultRoute(req, res, next) {
        res.status(404).send('No such route')
    }
}