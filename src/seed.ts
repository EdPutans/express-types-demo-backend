import prisma from './prismaClient'

const seed = async () => {
  await prisma.user.create({
    data: {
      email: 'ed@test.email',
      fullName: "Ed Catboi",
      photoUrl: "meow.jpf"
    }
  })

  await prisma.user.create({
    data: {
      email: 'adriano@test.email',
      fullName: "Adriano rama",
      photoUrl: "https://www.teksteshqip.com/img_upz/galeri_full/166/166374.jpg",
    }
  })
  await prisma.user.create({
    data: {
      email: 'nico@nico.nico',
      fullName: "Nico Nico NIIIIIII",
      photoUrl: 'https://media.distractify.com/brand-img/zcK7q9G7D/0x0/yazawa-nico-1626369451106.png'
    }
  })
}

seed()