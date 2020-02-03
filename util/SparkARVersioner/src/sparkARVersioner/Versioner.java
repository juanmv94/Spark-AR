package sparkARVersioner;

import java.nio.file.*;

public class Versioner {
	static final String ARPROJ="/main.json";
	static final String AREXPORT="/export.json";
	static final String AREXPORTFIELD="\"projectFileVersion\":{";
	static final String ARPROJFIELD="\"version\":{";
	static String zipPath;
	static String file=null;

	static String inist;
	static String endst;
	static boolean open=false;
	
	static private int[] parseVersion(String v) {
		final String[] fields=new String[]{"prod","dev","patch"};
		int[] result=new int[3];
		int index=0;
		for (String field : fields) {
			String ver, ini="\""+field+"\":";
			int i1=v.indexOf(ini)+ini.length();
			int i2=v.indexOf(",", i1);
			if (i2>=0) ver=v.substring(i1, i2);
			else ver=v.substring(i1);
			result[index++]=Integer.parseInt(ver);
		}
		return result;
	}
	
	static private String generateVersion(int[] v) {
		return "\"patch\":"+v[2]+",\"prod\":"+v[0]+",\"dev\":"+v[1];
	}
	
	static public int[] openZip(String filePath) throws Exception {
		open=false;
		zipPath=filePath;
	    Path zipFilePath = Paths.get(zipPath);
	    FileSystem fs = FileSystems.newFileSystem(zipFilePath, null);
	    try {
		    Path source = fs.getPath(ARPROJ);
		    if (Files.exists(source)) {
		    	file=ARPROJ;
		    	endst=new String(Files.readAllBytes(source));
		    	int i1=endst.indexOf(ARPROJFIELD);
		    	inist=endst.substring(0, i1)+ARPROJFIELD;
		    	endst=endst.substring(i1+ARPROJFIELD.length());

		    } else {
		    	source = fs.getPath(AREXPORT);
			    if (Files.exists(source)) {
			    	file=AREXPORT;
			    	endst=new String(Files.readAllBytes(source));
			    	int i1=endst.indexOf(AREXPORTFIELD);
			    	inist=endst.substring(0, i1)+AREXPORTFIELD;
			    	endst=endst.substring(i1+AREXPORTFIELD.length());
			    } else {
					throw new Exception("Zip file is not a SparkAR project");
				}
		    }
		    int i2=endst.indexOf("}");
		    String v=endst.substring(0,i2);
		    endst=endst.substring(i2);
		    int result[]=parseVersion(v);
		    open=true;
		    fs.close();
		    return(result);
	    } catch (Exception e) {
	    	fs.close();
	    	throw e;
	    }
	}
	
	static public void saveZip(int[] v) throws Exception {
		if (!open) return;
	    String sourceText=inist+generateVersion(v)+endst;
	    Path zipFilePath = Paths.get(zipPath);
	    FileSystem fs = FileSystems.newFileSystem(zipFilePath, null);
	    try {
		    Path source = fs.getPath(file);
		    Files.delete(source);
		    Files.write(source, sourceText.getBytes());
		    fs.close();
	    } catch (Exception e) {
	    	fs.close();
	    	throw e;
	    }
	}
	
	static public boolean isOpen() {
		return open;
	}
}
