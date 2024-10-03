import MyBookings from '../components/user/MyBookings'
import Layout from '../partials/Layout'

const BookingsPage = () => {
  return (
    <Layout title="Bookings">
      <div className="mx-auto max-w-5xl p-8">
        <MyBookings />
      </div>
    </Layout>
  )
}

export default BookingsPage
