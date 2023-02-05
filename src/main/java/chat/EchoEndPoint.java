package chat;

import java.io.IOException;

import javax.websocket.Endpoint;
import javax.websocket.EndpointConfig;
import javax.websocket.MessageHandler;
import javax.websocket.RemoteEndpoint;
import javax.websocket.Session;

public class EchoEndPoint extends Endpoint {

	@Override
	public void onOpen(Session session, EndpointConfig config) {
		RemoteEndpoint.Basic remoteEndPointBasic = session.getBasicRemote();
		session.addMessageHandler(new EchoMessageHandler(remoteEndPointBasic));
	}
	
	private static class EchoMessageHandler implements MessageHandler.Whole<String> {

		private final RemoteEndpoint.Basic remoteEndPointBasic;
		
		private EchoMessageHandler(RemoteEndpoint.Basic remoteEndPointBasic) {
			this.remoteEndPointBasic = remoteEndPointBasic;
		}
		
		@Override
		public void onMessage(String message) {
			try {
				if (remoteEndPointBasic != null) {
					remoteEndPointBasic.sendText(message);
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
			
		}
		
	}

}
