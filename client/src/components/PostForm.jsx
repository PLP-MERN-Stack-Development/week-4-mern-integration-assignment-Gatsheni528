const PostForm = ({ formData, setFormData, onSubmit }) => {
  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const form = new FormData();
    form.append('image', file);
    const res = await axios.post('/api/upload', form);
    setFormData({ ...formData, image: res.data.imageUrl });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input type="text" placeholder="Title" className="w-full p-2 border rounded"
        value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
      <textarea placeholder="Content" rows="6" className="w-full p-2 border rounded"
        value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} />
      <input type="file" onChange={handleImage} />
      {formData.image && <img src={formData.image} alt="Preview" className="w-32 h-auto mt-2" />}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save Post</button>
    </form>
  );
};
