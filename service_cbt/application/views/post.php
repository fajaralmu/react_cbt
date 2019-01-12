<form action=<?php echo base_url()."index.php/post/tambahpost";?> method="POST">
	<p>Judul</p>
	<input type="text" name="judul" />
	<p>Konten</p>
	<textarea name="konten" rows="10" cols="40"></textarea>
	<p>Tgl</p>
	<input type="date" name="tanggal" />
	<input type="hidden" name="username" value=<?=$username;?>>
	<br/>
	<p><input type="submit" value="Post"/></p>
</form>