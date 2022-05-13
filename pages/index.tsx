import styles from '../styles/Home.module.css'
import { useMantineTheme } from "@mantine/core"
import UiAvatar from '../components/common/Avatar/Avatar'

export default function Home() {
  const theme = useMantineTheme()
  
  return (
    <>
      <p>
        Hello World
      </p>
      {UiAvatar}
    </>
  )
}
