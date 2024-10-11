import clsx from 'clsx'
import { HTMLAttributes } from 'react'

const Logo = ({ className }: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <>
      <svg
        className={clsx('sm:hidden', className)}
        height="100%"
        viewBox="0 0 376 376"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="m234.506 129.836-104.67 11.001 11.001 104.67 104.67-11.001zM72 94.003l22.002 209.34 209.341-22.003L281.34 72z"
        />
      </svg>
      <svg
        className={clsx('hidden sm:block', className)}
        height="100%"
        viewBox="0 0 248 48"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="m7.619 36.19-.032-10.126h1.365l12.73-14.254h9.777L15.777 29.302h-1.746zM0 47.303V0h8.349v47.302zm22.253 0L10.698 31.175l5.65-5.905 15.905 22.032zM48.538 48q-5.206 0-9.016-2.286t-5.904-6.412q-2.064-4.127-2.064-9.588 0-5.491 2.064-9.619 2.095-4.158 5.904-6.444 3.81-2.286 9.016-2.286t9.016 2.286 5.904 6.444q2.095 4.127 2.095 9.62 0 5.46-2.095 9.587t-5.904 6.412T48.538 48m0-6.73q2.889 0 4.762-1.524 1.873-1.556 2.793-4.19.953-2.635.953-5.842 0-3.27-.953-5.904-.921-2.635-2.793-4.16-1.873-1.555-4.762-1.555-2.826 0-4.73 1.556-1.905 1.524-2.857 4.159-.92 2.634-.92 5.904 0 3.207.92 5.842.952 2.634 2.857 4.19 1.905 1.524 4.73 1.524M78.505 0v47.302h-8.349V0zm25.015 47.937q-3.016-.001-5.047-1.016-2-1.048-3.238-2.477-1.207-1.46-1.841-2.762h-.508v5.62h-8.19V0h8.348v17.683h.35q.635-1.27 1.809-2.73 1.174-1.493 3.174-2.54 2.032-1.048 5.175-1.048 4.095 0 7.396 2.095t5.238 6.159q1.969 4.063 1.969 10 0 5.84-1.905 9.937-1.905 4.095-5.238 6.254-3.301 2.126-7.492 2.127m-2.285-6.858q2.761 0 4.603-1.492 1.872-1.492 2.825-4.095.952-2.603.952-5.905 0-3.3-.952-5.873-.952-2.571-2.794-4.031-1.84-1.46-4.634-1.46-2.7 0-4.572 1.396-1.84 1.397-2.825 3.968-.952 2.54-.952 6 0 3.43.952 6.032.984 2.571 2.857 4.032 1.873 1.428 4.54 1.428M138.249 48q-5.207 0-9.015-2.286-3.81-2.285-5.905-6.412-2.063-4.127-2.063-9.588 0-5.491 2.063-9.619 2.095-4.158 5.905-6.444 3.808-2.286 9.015-2.286 5.206 0 9.016 2.286 3.808 2.286 5.904 6.444 2.095 4.127 2.095 9.62 0 5.46-2.095 9.587t-5.904 6.412T138.249 48m0-6.73q2.889 0 4.762-1.524 1.873-1.556 2.793-4.19.953-2.635.953-5.842 0-3.27-.953-5.904-.92-2.635-2.793-4.16-1.873-1.555-4.762-1.555-2.825 0-4.73 1.556-1.905 1.524-2.857 4.159-.921 2.634-.921 5.904 0 3.207.921 5.842.952 2.634 2.857 4.19 1.905 1.524 4.73 1.524m21.618 6.032V11.81h8.095v5.968h.381q.953-3.111 3.333-4.762 2.381-1.683 5.429-1.683.666 0 1.524.064.888.063 1.46.159v7.682q-.54-.19-1.683-.317a20 20 0 0 0-2.19-.127q-2.318 0-4.127.984a7.46 7.46 0 0 0-2.857 2.698q-1.016 1.714-1.016 4v20.826zm34.983.635q-4.158 0-7.492-2.127-3.301-2.16-5.206-6.254-1.905-4.096-1.904-9.937 0-5.937 1.936-10 1.968-4.063 5.27-6.159t7.396-2.095q3.143 0 5.143 1.048 2 1.047 3.174 2.54 1.207 1.46 1.842 2.73h.349V0h8.317v47.302h-8.158v-5.62h-.508q-.667 1.302-1.873 2.762-1.207 1.429-3.207 2.477-2 1.016-5.079 1.016m2.318-6.858q2.666 0 4.507-1.428 1.873-1.461 2.857-4.032.985-2.603.985-6.032 0-3.46-.985-6-.951-2.571-2.825-3.968-1.84-1.397-4.539-1.397-2.762 0-4.635 1.46-1.874 1.461-2.825 4.032-.921 2.572-.921 5.873t.952 5.905 2.794 4.095q1.873 1.492 4.635 1.492" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M240.163 6.594 228.247 7.85l1.253 11.934 11.916-1.254zm-18.5-4.085 2.505 23.868L248 23.87 245.495 0z"
        />
      </svg>
    </>
  )
}

export default Logo
