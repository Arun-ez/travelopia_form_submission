import styles from '@/styles/Menubar.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Menubar = ({ list }) => {

    const router = useRouter();

    return (
        <div className={styles.container}>
            {list.map(({ title, path }, index) => {
                return (
                    <Link
                        href={path}
                        key={index}
                        className={router.pathname === path ? styles.active : styles.inactive}
                    >
                        {title}

                    </Link>
                )
            })}
        </div>
    )
}

export { Menubar }
