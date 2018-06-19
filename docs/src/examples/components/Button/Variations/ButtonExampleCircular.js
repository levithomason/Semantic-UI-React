import faker from 'faker'
import React from 'react'
import { Button } from 'stardust'

const ButtonExampleCircular = () => <Button circular src={faker.internet.avatar()} />

export default ButtonExampleCircular
