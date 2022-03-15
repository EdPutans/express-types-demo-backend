import express, { json } from 'express';
import cors from 'cors';
import prisma from './prismaClient'
import { User } from '@prisma/client'
import { Req, Res, NoId, DP } from './types';

const app = express();
app.use(cors());
app.use(json());

app.get('/users', async (_, res: Res<User[]>) => {
  const users = await prisma.user.findMany()

  res.send({ data: users })
})


app.get('/users/:id', async (req: Req<DP>, res: Res<User>) => {
  const id = Number(req.params.id);

  const user = await prisma.user.findFirst({ where: { id } })
  if (!user) return res.status(404).send({ error: 'User not found' })

  res.send({ data: user })
})


app.post('/users', async (req: Req<{}, NoId<User>>, res: Res<User>) => {
  const data = req.body;
  const createdUser = await prisma.user.create({ data: data })

  res.send({ data: createdUser })
})

app.patch('/users/:id', async (req: Req<DP, NoId<User>>, res: Res<User>) => {
  const id = Number(req.params.id);

  const { email, fullName, photoUrl } = req.body;
  const updatedUser = await prisma.user.update({ where: { id }, data: { email, fullName, photoUrl } })
  if (!updatedUser) res.send({ error: 'something went wrong!', })

  res.send({ data: updatedUser })
})


app.delete('/users/:id', async (req: Req<DP>, res: Res<string>) => {
  const id = Number(req.params.id);

  const hasUserBeenDeleted = await prisma.user.delete({ where: { id } })
  if (!hasUserBeenDeleted) return res.send({ error: 'something went wrong!' })

  res.send({ data: "The user is dead, good job!" })
})

const port = 4000;

app.listen(port, () => { console.log('Listening on ', port) })
