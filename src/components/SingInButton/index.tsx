import { signOut, signIn, useSession } from 'next-auth/client'

import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

import styles from './styles.module.scss'

export function SingInButton() {
  const [session] = useSession()
  return session ? (
    (
      <button 
        type="button"
        className={styles.signInButton}  
        onClick={()=>signOut()} //funcao callback do next-auth
      >
        <FaGithub color="#04d361"/>
        {session.user.name}
        <FiX color="#737380" className={styles.closeIcon}/>
      </button>
    )
  ) : (
    <button 
      type="button"
      className={styles.signInButton}
      onClick={()=> signIn('github')}
    >
      <FaGithub color="#eba417"/>
      Sing in with GitHub
    </button>
  )
}
