export default function UserProfile({params}: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-red-500">
      <h1 className="text-green-500">Profile Page</h1>
      <hr />
      <p className="text-4xl text-red-500">This is a protected profile page
        <span className="p-2 mx-2 mr-2 rounded bg-orange-600 text-black">{params.id}</span></p>
    </div>
  );
}