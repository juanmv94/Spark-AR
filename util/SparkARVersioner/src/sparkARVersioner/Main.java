package sparkARVersioner;

import java.awt.Dimension;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;
import javax.swing.filechooser.FileFilter;

import javax.swing.*;

class SparkARFileFilter extends FileFilter
{
  private final String[] okFileExtensions = new String[] {".arproj", ".arexport"};

  public boolean accept(File file)
  {
	if (file.isDirectory()) return true;
    for (String extension : okFileExtensions)
    {
      if (file.getName().toLowerCase().endsWith(extension))
      {
        return true;
      }
    }
    return false;
  }
  
  public String getDescription() {
      return "SparkAR project files";
  }
}

public class Main extends JPanel implements ActionListener {
	final JFileChooser fc = new JFileChooser();
	final JButton openButton = new JButton("Open project",new ImageIcon(Main.class.getResource("/Open16.gif")));
	final JButton saveButton = new JButton("Save changes",new ImageIcon(Main.class.getResource("/Save16.gif")));
	final JTextField[] ver=new JTextField[3];
	Main() {
		fc.setFileFilter(new SparkARFileFilter());
		openButton.addActionListener(this);
		saveButton.addActionListener(this);
		add(openButton);
		add(saveButton);
		add(new JLabel("SparkAR version: "));
		for (int i=0;i<3;i++) {
			if (i>0) add(new JLabel("."));
			ver[i]=new JTextField();
			ver[i].setPreferredSize(new Dimension(40,24));
			ver[i].setEditable(false);
			add(ver[i]);
		}
	}

	public void actionPerformed(ActionEvent e) {
	    //Handle open button action.
	    if (e.getSource() == openButton) {
	        int returnVal = fc.showOpenDialog(this);
	        if (returnVal == JFileChooser.APPROVE_OPTION) {
	        	try {
					int[] v=Versioner.openZip(fc.getSelectedFile().getAbsolutePath());
					for (int i=0;i<3;i++) {
						ver[i].setText(Integer.toString(v[i]));
						ver[i].setEditable(true);
					}
				} catch (Exception e1) {
					for (int i=0;i<3;i++) {
						ver[i].setText("");
						ver[i].setEditable(false);
					}
					JOptionPane.showMessageDialog(this,"Unsupported file","Can't open file",JOptionPane.ERROR_MESSAGE);
				}
	        }
	    } else if (e.getSource() == saveButton) {
	    	if (!Versioner.isOpen()) return;
	    	int[] v=new int[3];
	    	try {
	    		for (int i=0;i<3;i++) {
	    			v[i]=Integer.parseInt(ver[i].getText());
	    		}
	    	} catch (Exception e1) {
				JOptionPane.showMessageDialog(this,"Version must contain only numbers","Wrong numbers",JOptionPane.ERROR_MESSAGE);
				return;
			}
	    	try {
	    		Versioner.saveZip(v);
	    		JOptionPane.showMessageDialog(this,"File saved!","Success",JOptionPane.INFORMATION_MESSAGE);
	    	} catch (Exception e1) {
				JOptionPane.showMessageDialog(this,"Error saving file","Can't open file",JOptionPane.ERROR_MESSAGE);
			}
	    }
	}
	
	public static void main(String[] args) {
		UIManager.put("swing.boldMetal", Boolean.FALSE);
		JFrame frame = new JFrame("SparkARVersioner");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.add(new Main());
        //frame.pack();
        frame.setSize(300, 100);
        frame.setResizable(false);
        frame.setLocationRelativeTo(null);
        frame.setVisible(true);
	}

}
