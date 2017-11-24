export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

  let pods = server.createList('podcast', 70);
  pods.forEach((pod) => {
    server.createList('episode', ((pod.id === "1") ? 70 : 3), { podcast: pod });
  });
}
