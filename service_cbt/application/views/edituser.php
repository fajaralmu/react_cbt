<img src=<?php echo base_url('uploads/'.$gambar);?> width="100">
<form action=<?php echo base_url()."index.php/akun/prosesedit/".$username;?> method="POST" enctype="multipart/form-data">
	<p>Username</p>
	<input type="text" name="username" value="<?=$username?>"/>
	<p>Password</p>
	<input type="text" name="password" value="<?=$password?>"/>
	<p>Nama depan</p>
	<input type="text" name="nama_depan"value=" <?=$nama_depan?>" />
	<p>Nama belakang</p>
	<input type="text" name="nama_belakang"value="<?=$nama_belakang?>" />
	<p>Ganti foto profil</p>
	<input type="file" id="file" name="file"/>
	<button id="reset" onclick="document.getElementById('file').value=''; return false;">reset</button>
	<br/>
	<p><input type="submit" value="Edit"/></p>
</form>


